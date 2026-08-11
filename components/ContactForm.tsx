"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full border-b border-ink/25 bg-transparent py-4 text-lg text-ink placeholder:text-stone/70 focus:border-terracotta focus:outline-none transition-colors duration-500";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(body.message ?? "Something went wrong. Please call us instead.");
        return;
      }
      setStatus("sent");
      setMessage("Thank you! Your message is on its way. We will be in touch shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call us at 613-266-1826.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">Your name</span>
          <input name="name" type="text" required maxLength={120} placeholder="Your full name" className={inputClasses} />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">Email</span>
          <input name="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClasses} />
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">
          Tell us about your project
        </span>
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={4}
          placeholder="A new website, a redesign, an online store..."
          className={inputClasses}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 border border-ink bg-ink px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-parchment transition-colors duration-500 hover:bg-terracotta hover:border-terracotta disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
        </button>
        {status === "sent" ? <p className="text-sm text-olive">{message}</p> : null}
        {status === "error" ? <p className="text-sm text-terracotta">{message}</p> : null}
      </div>
    </form>
  );
}
