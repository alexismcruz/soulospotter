import Link from "next/link";

interface SouloLogoProps {
  className?: string;
  linkClassName?: string;
}

export default function SouloLogo({ className = "", linkClassName = "" }: SouloLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${linkClassName}`} aria-label="SouloSpotter — Home">
      {/* Icon mark: stylised compass needle path */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
        aria-hidden="true"
      >
        {/* Outer circle */}
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" className="text-soulo-gold" />
        {/* Compass needle — north point (gold) */}
        <path
          d="M16 4 L19.2 16 L16 14 L12.8 16 Z"
          fill="#F5C842"
        />
        {/* Compass needle — south point (muted) */}
        <path
          d="M16 28 L12.8 16 L16 18 L19.2 16 Z"
          fill="currentColor"
          className="text-soulo-mist"
          opacity="0.5"
        />
        {/* Centre dot */}
        <circle cx="16" cy="16" r="1.8" fill="#F5C842" />
      </svg>

      {/* Wordmark */}
      <span className="font-display font-bold text-xl tracking-tight leading-none">
        <span className="text-soulo-white group-hover:text-soulo-white transition-colors">Soulo</span>
        <span className="text-soulo-gold">Spotter</span>
      </span>
    </Link>
  );
}
