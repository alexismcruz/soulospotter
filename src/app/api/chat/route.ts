import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat/systemPrompt";
import { CHAT_TOOLS, runChatTool } from "@/lib/chat/tools";
import { checkRateLimit, sweepRateLimit } from "@/lib/chat/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1024;
const MAX_TOOL_ROUNDS = 4;     // cap the agentic loop
const MAX_HISTORY = 20;        // trim conversation length

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});
const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_HISTORY),
});

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : null)?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The travel assistant isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  sweepRateLimit();
  const rl = checkRateLimit(clientIp(req));
  if (!rl.ok) {
    return NextResponse.json(
      { error: "You've sent a lot of messages — please take a short break and try again soon." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec ?? 60) } },
    );
  }

  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = parsed.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    let citations: { label: string; url: string }[] = [];

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        thinking: { type: "disabled" },
        output_config: { effort: "low" },
        system: CHAT_SYSTEM_PROMPT,
        tools: CHAT_TOOLS,
        messages,
      });

      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
      );

      if (response.stop_reason !== "tool_use" || toolUses.length === 0) {
        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return NextResponse.json({
          reply: text || "Sorry, I didn't catch that — could you rephrase?",
          citations: dedupeCitations(citations),
        });
      }

      // Execute tools and collect link citations for the UI
      messages.push({ role: "assistant", content: response.content });
      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const tu of toolUses) {
        const out = await runChatTool(tu.name, (tu.input ?? {}) as Record<string, unknown>);
        citations = citations.concat(extractCitations(out));
        results.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: JSON.stringify(out).slice(0, 6000),
        });
      }
      messages.push({ role: "user", content: results });
    }

    return NextResponse.json({
      reply:
        "I found a lot to consider — could you narrow it down (a region, a vibe, or a budget)?",
      citations: dedupeCitations(citations),
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "The assistant is busy right now — please try again in a moment." },
        { status: 429 },
      );
    }
    console.error("chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching the travel assistant." },
      { status: 500 },
    );
  }
}

// Pull {label, url} pairs out of tool output so the UI can render link chips.
function extractCitations(out: unknown): { label: string; url: string }[] {
  const found: { label: string; url: string }[] = [];
  const visit = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(visit);
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (typeof o.url === "string" && typeof o.name === "string") {
        found.push({ label: o.name, url: o.url });
      }
      Object.values(o).forEach(visit);
    }
  };
  visit(out);
  return found;
}

function dedupeCitations(list: { label: string; url: string }[]) {
  const seen = new Set<string>();
  return list.filter((c) => (seen.has(c.url) ? false : (seen.add(c.url), true))).slice(0, 8);
}
