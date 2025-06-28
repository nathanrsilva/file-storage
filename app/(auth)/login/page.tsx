'use client'

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useState } from "react";

function LoginPage() {

    const [switchForm, setSwitchForm] = useState<'login' | 'register'>('login')

    return (
        <>
            {switchForm === 'login'? <Login setSwitchRegister={setSwitchForm}/> : <Register setSwitchLogin={setSwitchForm}/>}
        </>
    )
}

export default LoginPage