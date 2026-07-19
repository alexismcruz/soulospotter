type Props = {
  href: string;
  label: string;
  sublabel?: string;
  color: "blue" | "amber" | "teal";
  /**
   * Whether this is a genuine paid/affiliate link. Defaults to true.
   * Pass false for plain editorial links (e.g. a provider we have no affiliate
   * relationship with) — rel="sponsored" must only mark real paid links.
   */
  sponsored?: boolean;
};

const COLORS = {
  blue:  { btn: "bg-soulo-slate hover:bg-soulo-dark text-soulo-white", wrap: "bg-soulo-linen border-soulo-border" },
  amber: { btn: "bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold", wrap: "bg-soulo-linen border-soulo-border" },
  teal:  { btn: "bg-soulo-teal hover:bg-teal-400 text-soulo-dark font-bold", wrap: "bg-soulo-linen border-soulo-border" },
};

export default function AffiliateCTA({ href, label, sublabel, color, sponsored = true }: Props) {
  const c = COLORS[color];
  return (
    <div className={`rounded-2xl border ${c.wrap} p-5 flex flex-col sm:flex-row items-center justify-between gap-4`}>
      {sublabel && (
        <p className="text-sm text-soulo-grey font-medium">{sublabel}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel={sponsored ? "noopener noreferrer sponsored" : "noopener noreferrer"}
        className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm transition-colors text-center ${c.btn}`}
      >
        {label} →
      </a>
    </div>
  );
}
