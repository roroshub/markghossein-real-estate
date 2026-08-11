import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  message: z.string().trim().min(1, "Please tell us about your project.").max(4000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ message }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { message: `Email is not configured yet. Please call us at ${site.phone}.` },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? `SARO Website <onboarding@resend.dev>`,
      to,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { message: `We could not send your message. Please call us at ${site.phone}.` },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact form error", err);
    return NextResponse.json(
      { message: `We could not send your message. Please call us at ${site.phone}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Sent" });
}
