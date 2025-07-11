import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/util/supabase/server'
import { redirect } from 'next/navigation'
import { cloudinary } from '@/lib/cloudinary'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app


      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .insert({
            user_id: user.id,
            email: user.email
          })
          .select()

        if (error) {
          console.log(error)
        } else {
          const newUser: { user_id: string, email: string } = data[0]
          console.log(newUser)

          await cloudinary.api
            .create_folder(newUser.user_id + '/All Files')
            .then(result => console.log(result));
        }
      }

      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}