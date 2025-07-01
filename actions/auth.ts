'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/util/supabase/server'
import { email, z } from 'zod/v4'
import { loginSchema } from '@/util/loginSchema'
import { redirect } from 'next/navigation'

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

    revalidatePath('/dashboard', 'layout')

    return {
        status: 'success',
        message: 'User logged successfully'
    }
}

export async function signup(values: z.infer<typeof loginSchema>) {
    const supabase = await createClient()

    //VALIDATE INPUTS
    const result = loginSchema.safeParse(values)

    if (!result.success) {
        console.log(z.prettifyError(result.error))

        return {
            status: 'error validation',
            message: z.prettifyError(result.error)
        }
    }

    //CHECK IF EMAIL EXISTS
    const data = {
        email: values.email,
        password: values.password,
    }

    let { data: custom_user, error } = await supabase
        .from('custom_user')
        .select("*")
        .eq('email', values.email)

    if (custom_user?.length! > 0) {
        return {
            status: 'error emailExists',
            message: 'Email already exists! Please choose another email'
        }
    } else {

        //SIGNUP NEW USER
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