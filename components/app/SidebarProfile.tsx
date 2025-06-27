import React from 'react'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Profile from './Profile'
import { ChevronsUpDown } from 'lucide-react';

function SidebarProfile() {
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
                    <DropdownMenuItem>
                        <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </SidebarMenuItem>
    )
}

export default SidebarProfile