'use client'

import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/util/loginSchema'
import { z } from 'zod/v4'
import { Dispatch, SetStateAction } from 'react'

function Login({setSwitchRegister}: {setSwitchRegister: Dispatch<SetStateAction<"register" | "login">>}) {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSwitchForm = ()=>{
        setSwitchRegister('register')
    }

    const onSubmit = (values: z.infer<typeof loginSchema>)=>{
        console.log(values)
    }   

    return (
        <div className="flex rounded-sm overflow-hidden m-10 shadow-xl w-5xl border-1 h-130">
            <Form {...form}>
                <form className="w-1/2 p-5 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="text-center my-15 space-y-3">
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
            <Image priority src='/images/mountain.png' alt='Mountain' width='300' height='300' className="w-1/2" />
        </div>
    )
}

export default Login