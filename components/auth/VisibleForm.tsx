'use client'

import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

function VisibleForm() {
    const [switchForm, setSwitchForm] = useState<'login' | 'register'>('login')

    return (
        <>
            {
                switchForm === 'login' ? <Login setSwitchRegister={setSwitchForm} />
                    :
                    <Register setSwitchLogin={setSwitchForm} />
            }
        </>
    )
}

export default VisibleForm