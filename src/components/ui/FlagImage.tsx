type Props = {
  code: string;       // ISO 3166-1 alpha-2, e.g. "CO", "PH"
  name: string;       // country name for alt text
  size?: "sm" | "md";
};

export default function FlagImage({ code, name, size = "sm" }: Props) {
  const dimensions = size === "sm" ? { w: 16, h: 12 } : { w: 20, h: 15 };
  return (
    <img
      src={`https://flagcdn.com/${dimensions.w}x${dimensions.h}/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/${dimensions.w * 2}x${dimensions.h * 2}/${code.toLowerCase()}.png 2x`}
      width={dimensions.w}
      height={dimensions.h}
      alt={`${name} flag`}
      className="inline-block rounded-sm flex-shrink-0"
      style={{ objectFit: "cover" }}
    />
  );
}
