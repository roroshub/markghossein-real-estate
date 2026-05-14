import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas'

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

  // In production: forward to CRM, send email via Resend/SendGrid, etc.
  // For now we log and return success.
  console.log('[Contact Form]', result.data)

  return NextResponse.json({ success: true }, { status: 200 })
}
