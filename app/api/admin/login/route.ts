import { NextRequest, NextResponse } from 'next/server'
import { checkPassword, createSession } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!checkPassword(body.password ?? '')) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }
  await createSession()
  return NextResponse.json({ success: true })
}
