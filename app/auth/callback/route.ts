import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/admin'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const urlParams = new URLSearchParams()
      urlParams.set('next', next)
      return NextResponse.redirect(
        new URL(`/admin?${urlParams.toString()}`, request.url)
      )
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/auth/error', request.url))
}
