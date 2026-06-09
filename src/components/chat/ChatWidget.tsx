"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; content: string; citations?: { label: string; url: string }[] };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Soulo 👋 Your solo-travel concierge. Ask me where to go, what's safe, or what to do in a city — I'll point you to real SouloSpotter spots.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const payload = next
        .filter((m) => m !== GREETING)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: payload.slice(-20) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: data.error ?? "Something went wrong." }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply, citations: data.citations }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the server — please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button — bottom-LEFT to avoid the Check Flights button (bottom-right) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Ask Soulo, the travel assistant"
        className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 px-5 py-3.5 rounded-full bg-soulo-slate hover:bg-soulo-dark text-soulo-white font-bold shadow-xl transition-all hover:scale-105"
      >
        <span className="text-lg">💬</span>
        <span className="text-sm">Ask Soulo</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/20 sm:hidden" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 left-5 z-[61] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[70vh] sm:h-[540px] bg-white rounded-2xl shadow-2xl border border-soulo-border flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-soulo-slate text-soulo-white">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧭</span>
                <div>
                  <p className="font-display font-bold text-sm leading-tight">Soulo</p>
                  <p className="text-[11px] text-soulo-mist leading-tight">Solo-travel concierge</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-soulo-mist hover:text-white p-1 -m-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-soulo-linen">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-soulo-slate text-soulo-white rounded-br-sm"
                        : "bg-white text-soulo-dark border border-soulo-border rounded-bl-sm"
                    }`}
                  >
                    {renderText(m.content)}
                    {m.citations && m.citations.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.citations.map((c) => (
                          <Link
                            key={c.url}
                            href={c.url}
                            className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-soulo-gold/15 text-soulo-dark border border-soulo-gold/30 hover:bg-soulo-gold/25"
                            onClick={() => setOpen(false)}
                          >
                            {c.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-soulo-border rounded-2xl rounded-bl-sm px-4 py-3">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-soulo-mist animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-soulo-mist animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-soulo-mist animate-bounce" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-soulo-border p-2.5 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  maxLength={2000}
                  placeholder="Where should I go solo?"
                  className="flex-1 resize-none max-h-24 px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
              <p className="text-[10px] text-soulo-mist mt-1.5 px-1">Soulo can make mistakes — double-check key details.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Minimal Markdown-link renderer: turns [label](/path) into clickable links.
function renderText(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={key++} href={m[2]} className="text-soulo-gold font-semibold underline underline-offset-2">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
