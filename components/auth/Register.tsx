'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/util/loginSchema'
import { z } from 'zod/v4'
import { Dispatch, SetStateAction, useActionState, useState } from 'react'
import { signup } from '@/actions/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import AlertMessage from './AlertMessage'

function Register({ setSwitchLogin }: { setSwitchLogin: Dispatch<SetStateAction<"register" | "login">> }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [emailVerification, setEmailVerification] = useState('')
    const [errorSignup, setErrorSignup] = useState('')

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSwitchForm = () => {
        setSwitchLogin('login')
    }

    const handleOnSubmit = async (values: z.infer<typeof loginSchema>) => {
        const result = await signup(values)

        if(result.status === 'error validation'){
            toast.error(result.message)
        }

        if(result.status === 'error emailExists'){
            toast.warning(result.message)
        }

        if(result.status === 'error signup'){
            setErrorSignup(result.message)
        }

        if(result.status === 'success'){
            setEmailVerification(result.message)
            setButtonDisabled(true)
        }
    }

    return (
        <Form {...form}>
            <form className="p-15 border-1 space-y-10 rounded-md shadow-xl w-lg" onSubmit={form.handleSubmit(handleOnSubmit)}>
                <div className="text-center space-y-3 mb-15">
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <p className="text-sm text-gray-600">Enter your email and password below to create your account</p>
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
                                <Button variant={'link'} type='button'></Button>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={buttonDisabled} type='submit' className="w-full cursor-pointer text-md disabled:bg-accent-foreground">Create an account</Button>
                
                {emailVerification && <AlertMessage title={emailVerification} type='warning'/>}
                {errorSignup && <AlertMessage title={errorSignup} type='error'/>}

                <div className="flex justify-center items-center">
                    <span className="text-gray-700">Have an account?</span>
                    <Button
                        type='button'
                        variant='link'
                        className="underline cursor-pointer"
                        onClick={handleSwitchForm}
                    >Sign In</Button>
                </div>
            </form>
        </Form>
    )
}

export default Register