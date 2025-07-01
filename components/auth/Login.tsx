'use client'

import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/util/loginSchema'
import { z } from 'zod/v4'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { login } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import AlertMessage from './AlertMessage'

function Login({ setSwitchRegister }: { setSwitchRegister: Dispatch<SetStateAction<"register" | "login">> }) {

    const [errorSignIn, setErrorSignIn] = useState('')

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    const handleSwitchForm = () => {
        setSwitchRegister('register')
    }

    const handleOnSubmit = async (values: z.infer<typeof loginSchema>) => {
        const result = await login(values)

        if(result.status === 'error validation'){
            toast.error(result.message)
        }

        if(result.status === 'error signin'){
            setErrorSignIn(result.message)
        }

        if(result.status === 'success'){
            toast.success(result.message)
            router.push('/dashboard')
        }

    }

    return (
        <Form {...form}>
            <form 
            className="p-15 border-1 space-y-10 rounded-md shadow-xl w-lg" 
            onSubmit={form.handleSubmit(handleOnSubmit)}>
                <div className="text-center space-y-3 mb-15">
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-sm text-gray-600">Enter your email and password to login sign in</p>
                </div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='something@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between">
                                <span>Password</span>
                                <Button variant='link' type="button" className="cursor-pointer">Forgot your Password?</Button>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {errorSignIn && <AlertMessage title={errorSignIn} type='error'/>}

                <Button type='submit' className="w-full cursor-pointer text-md">Login</Button>

                <div className="flex justify-center items-center">
                    <span className="text-gray-700">Don't have an account?</span>
                    <Button
                        type='button'
                        variant='link'
                        className="underline cursor-pointer"
                        onClick={handleSwitchForm}
                    >Sign Up</Button>
                </div>
            </form>
        </Form>
    )
}

export default Login