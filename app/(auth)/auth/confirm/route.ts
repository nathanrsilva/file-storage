import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/util/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app


      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('custom_user')
        .insert({
          id: user?.id,
          email: user?.email
        })

      if(error){
        throw new Error(error.message)
      }

      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}