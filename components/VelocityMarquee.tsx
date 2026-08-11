"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A marquee whose speed and skew react to scroll velocity.
 * Children are rendered twice for a seamless loop.
 */
export default function VelocityMarquee({
  children,
  baseSpeed = 60,
  className = "",
}: {
  children: ReactNode;
  baseSpeed?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let velocity = 0;
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(64, now - lastTime) / 1000;
      lastTime = now;

      const scroll = window.scrollY;
      const instant = (scroll - lastScroll) / Math.max(dt, 0.001);
      lastScroll = scroll;
      velocity += (instant - velocity) * 0.08;

      const speed = baseSpeed + Math.min(Math.abs(velocity) * 0.28, 460);
      offset -= speed * dt;

      const half = track.scrollWidth / 2;
      if (half > 0 && -offset >= half) offset += half;

      const skew = Math.max(-10, Math.min(10, velocity * 0.006));
      track.style.transform = `translateX(${offset}px) skewX(${-skew}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [baseSpeed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
        {children}
      </div>
    </div>
  );
}
