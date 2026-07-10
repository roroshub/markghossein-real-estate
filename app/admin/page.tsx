import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAuthed } from '@/lib/admin-auth'
import { AdminDashboard } from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Blog Admin',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAuthed())) redirect('/admin/login')
  return <AdminDashboard />
}
