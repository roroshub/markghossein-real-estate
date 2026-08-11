import VelocityMarquee from "./VelocityMarquee";
import { Rosette } from "./Ornaments";

const words = [
  "Design",
  "Development",
  "E-Commerce",
  "Branding",
  "SEO",
  "Content",
  "Motion",
  "Ottawa",
];

export default function Marquee() {
  return (
    <div className="border-y border-cream/15 bg-terracotta py-5 text-cream" aria-hidden="true">
      <VelocityMarquee>
        <div className="flex shrink-0 items-center">
          {words.map((word) => (
            <span key={word} className="flex items-center">
              <span className="px-8 font-display text-2xl italic tracking-wide md:text-3xl">{word}</span>
              <Rosette className="h-4 w-4 opacity-70" />
            </span>
          ))}
        </div>
      </VelocityMarquee>
    </div>
  );
}
