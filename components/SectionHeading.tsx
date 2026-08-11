import Reveal from "./Reveal";

type SectionHeadingProps = {
  numeral: string;
  label: string;
  title: string;
  titleItalic?: string;
  tone?: "light" | "dark";
};

export default function SectionHeading({
  numeral,
  label,
  title,
  titleItalic,
  tone = "light",
}: SectionHeadingProps) {
  const rule = tone === "light" ? "bg-ink/20" : "bg-cream/25";
  const muted = tone === "light" ? "text-stone" : "text-cream/60";

  return (
    <div>
      <Reveal variant="none" className="flex items-center gap-5">
        <span className={`font-display text-lg italic ${muted}`}>{numeral}.</span>
        <span className={`text-[11px] font-semibold uppercase tracking-[0.4em] ${muted}`}>{label}</span>
        <span className={`reveal-rule h-px flex-1 ${rule}`} />
      </Reveal>
      <Reveal
        as="h2"
        variant="none"
        className="mt-8 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-tight"
      >
        <span className="reveal-line">
          <span>
            {title}
            {titleItalic ? (
              <>
                {" "}
                <em className={tone === "light" ? "text-terracotta" : "text-gold-bright"}>{titleItalic}</em>
              </>
            ) : null}
          </span>
        </span>
      </Reveal>
    </div>
  );
}
