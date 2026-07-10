import { cookies } from 'next/headers'

const COOKIE = 'mg_admin'

// Session token = HMAC(ADMIN_PASSWORD, fixed-string). Can't be forged without the password.
async function sessionToken(): Promise<string> {
  const pw = process.env.ADMIN_PASSWORD ?? ''
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(pw), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('mg-admin-session-v1'))
  return Buffer.from(new Uint8Array(sig)).toString('base64url')
}

export function checkPassword(pw: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  return !!expected && pw === expected
}

export async function createSession(): Promise<void> {
  const jar = await cookies()
  jar.set(COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function destroySession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE)
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies()
  const value = jar.get(COOKIE)?.value
  if (!value) return false
  return value === (await sessionToken())
}
