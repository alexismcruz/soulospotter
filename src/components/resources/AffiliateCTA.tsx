type Props = {
  href: string;
  label: string;
  sublabel?: string;
  color: "blue" | "amber" | "teal";
};

const COLORS = {
  blue:  { btn: "bg-blue-600 hover:bg-blue-500 text-white",  wrap: "bg-blue-50 border-blue-200" },
  amber: { btn: "bg-amber-500 hover:bg-amber-400 text-stone-900", wrap: "bg-amber-50 border-amber-200" },
  teal:  { btn: "bg-teal-600 hover:bg-teal-500 text-white",  wrap: "bg-teal-50 border-teal-200" },
};

export default function AffiliateCTA({ href, label, sublabel, color }: Props) {
  const c = COLORS[color];
  return (
    <div className={`rounded-2xl border ${c.wrap} p-5 flex flex-col sm:flex-row items-center justify-between gap-4`}>
      {sublabel && (
        <p className="text-sm text-stone-600 font-medium">{sublabel}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-colors text-center ${c.btn}`}
      >
        {label} →
      </a>
    </div>
  );
}
