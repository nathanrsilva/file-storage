'use client'

import React, { use, useActionState, useEffect } from 'react'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Profile from './Profile'
import { ChevronsUpDown } from 'lucide-react';
import { logout } from '@/actions/auth';
import { toast } from 'sonner'

function SidebarProfile() {

    const [state, formAction] = useActionState(logout, null)

    useEffect(() => {
        if (state?.status === 'error') {
            toast.error(state.message)
        }
    }, [state])

    return (
        <SidebarMenuItem>
            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <Profile />
                        <ChevronsUpDown />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent side='top' className="w-3xs">
                    <DropdownMenuItem asChild>
                        <form action={formAction} className="w-full">
                            <button type="submit" className='w-full text-left'>Sign out</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </SidebarMenuItem>
    )
}

export default SidebarProfile