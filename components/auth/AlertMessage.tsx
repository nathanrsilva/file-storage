import React from 'react'

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

function AlertMessage({ title, type }: { title: string, type: 'warning' | 'error' }) {
    return (
        <div>
            <Alert className={type === 'warning' ?
                'text-yellow-600 bg-yellow-100/30 text-lg'
                :
                'text-red-600 bg-red-200 text-lg'
            }>
                <AlertCircleIcon />
                <AlertTitle>
                    {title}
                </AlertTitle>
            </Alert>
        </div>
    )
}

export default AlertMessage