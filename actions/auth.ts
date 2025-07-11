'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/util/supabase/server'
import { z } from 'zod/v4'
import { loginSchema } from '@/util/loginSchema'
import { redirect } from 'next/navigation'
import { userStorage } from './folders/folders-actions'

export async function login(values: z.infer<typeof loginSchema>) {
    const supabase = await createClient()

    const result = loginSchema.safeParse(values)

    if (!result.success) {
        console.log(z.prettifyError(result.error))

        return {
            status: 'error validation',
            message: z.prettifyError(result.error)
        }
    }

    const data = {
        email: values.email,
        password: values.password,
    }

    const { error: errorSignIn } = await supabase.auth.signInWithPassword(data)

    if (errorSignIn) {
        return {
            status: 'error signin',
            message: errorSignIn.message
        }
    }

    await userStorage()
    revalidatePath('/dashboard', 'layout')

    return {
        status: 'success',
        message: 'User logged successfully'
    }
}

export async function signup(values: z.infer<typeof loginSchema>) {
    const supabase = await createClient()

    const result = loginSchema.safeParse(values)

    if (!result.success) {
        console.log(z.prettifyError(result.error))

        return {
            status: 'error validation',
            message: z.prettifyError(result.error)
        }
    }

    const data = {
        email: values.email,
        password: values.password,
    }

    let { data: custom_user, error } = await supabase
        .from('user')
        .select("*")
        .eq('email', values.email)

    if (custom_user?.length! > 0) {
        return {
            status: 'error emailExists',
            message: 'Email already exists! Please choose another email'
        }
    } else {

        const { data: signupData, error: errorSignup } = await supabase.auth.signUp(data)

        if (errorSignup) {
            return {
                status: 'error signup',
                message: errorSignup.message
            }
        }
    }

    return {
        status: 'success',
        message: 'Access your email to verify the account'
    }

}

export async function logout(prevState: any) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
        status: 'error',
        message: error.message
    }
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/login')

}