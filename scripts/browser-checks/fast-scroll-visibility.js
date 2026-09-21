// Fast-scroll visibility check — paste into the browser console (or Claude's javascript_tool) on ANY page.
//
// Why this exists: screenshots taken after scrolling in the Claude Browser pane can be captured at a wrong
// offset (blank frames, sticky header drawn mid-screen) even though the page is fine. This test doesn't
// use screenshots. It does big instant scroll jumps (like a fast wheel flick) and, at each stop, checks
// what is actually there: real text at probe points, no opacity:0 / visibility:hidden ancestors, images
// loaded. History: Sep 2026 audit reported "blank sections when scrolling fast" — verified NOT a
// reveal-on-scroll bug (the site has no scroll-reveal code); the real cause was card photo areas having
// no placeholder colour while photos load. Fixed with bg-soulo-linen placeholders + eager first row.
//
// Expect: problems: 0. Run at desktop (1024+) and mobile (375) widths.
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const vh = innerHeight, max = document.documentElement.scrollHeight - vh;
  const stops = [];
  for (let y = 0; y < max; y += Math.round(vh * 1.8)) stops.push(y);
  stops.push(max);
  const out = [];
  for (const y of stops) {
    window.scrollTo(0, y); // instant jump
    await sleep(350);
    const probes = [0.2, 0.5, 0.8].map((f) => {
      const el = document.elementFromPoint(innerWidth / 2, vh * f);
      let hidden = false, e = el;
      while (e && e !== document.body) {
        const c = getComputedStyle(e);
        if (c.opacity === "0" || c.visibility === "hidden") { hidden = true; break; }
        e = e.parentElement;
      }
      const sec = el && el.closest("section,footer,header,main");
      return { txt: sec ? (sec.innerText || "").replace(/\s+/g, " ").trim().slice(0, 28) : el ? el.tagName : null, hidden };
    });
    const imgs = [...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < vh && r.width > 0; });
    out.push({ y, probes: probes.map((p) => p.txt + (p.hidden ? " [HIDDEN]" : "")), imgsInView: imgs.length, imgsNotLoaded: imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).length });
  }
  const problems = out.filter((o) => o.probes.some((p) => p.includes("[HIDDEN]") || /^(null|HTML|BODY)/.test(p)));
  return JSON.stringify({ viewport: innerWidth + "x" + vh, docHeight: max + vh, stops: out.length, problems: problems.length, detail: out });
})();
