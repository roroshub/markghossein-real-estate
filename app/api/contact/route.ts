import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema, type ContactForm } from '@/lib/schemas'

const LEAD_FROM = process.env.LEAD_FROM ?? 'Mark Ghossein Leads <leads@sarodev.com>'
const LEAD_TO   = process.env.LEAD_TO ?? 'mark@markghossein.com'

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

function leadEmail(d: ContactForm): { subject: string; html: string } {
  const name = `${d.firstName} ${d.lastName}`.trim()
  const rows: [string, string | undefined][] = [
    ['Name', name],
    ['Email', d.email],
    ['Phone', d.phone],
    ['Interested in', d.interest],
    ['Message', d.message],
  ]
  const body = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#8a8a8a;font:600 12px/1.5 Arial,sans-serif;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#161616;font:400 14px/1.6 Arial,sans-serif">${esc(String(v))}</td></tr>`)
    .join('')
  const subject = `New website lead — ${name}${d.interest ? ` (${d.interest})` : ''}`
  const html = `
    <div style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif">
      <div style="background:#0f0f0f;padding:22px 24px">
        <span style="color:#c9a96e;font:700 12px/1 Arial;letter-spacing:2px">MARK GHOSSEIN · NEW LEAD</span>
      </div>
      <div style="border:1px solid #eee;border-top:0;padding:24px">
        <table style="border-collapse:collapse;width:100%">${body}</table>
        <p style="margin:22px 0 0;color:#9a9a9a;font:400 11px/1.5 Arial">Sent from markghossein-next via the website contact forms.</p>
      </div>
    </div>`
  return { subject, html }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 422 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // No key configured (e.g. local dev) — log and succeed so forms still work.
    console.log('[Contact Form] (email disabled — no RESEND_API_KEY)', result.data)
    return NextResponse.json({ success: true }, { status: 200 })
  }

  try {
    const { subject, html } = leadEmail(result.data)
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: LEAD_FROM,
      to: LEAD_TO,
      replyTo: result.data.email,
      subject,
      html,
    })
    if (error) {
      console.error('[Contact Form] Resend error:', error)
      return NextResponse.json({ error: 'Could not send' }, { status: 502 })
    }
  } catch (err) {
    console.error('[Contact Form] send failed:', err)
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
