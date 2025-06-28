import React from 'react'
import { SidebarMenuSubItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

function FolderItem({ children }: { children: React.ReactNode }) {
    return (
        <SidebarMenuSubItem className='flex justify-between'>
            {children}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start">
                    <DropdownMenuItem>
                        <span>Rename File</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Delete File</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuSubItem>
    )
}

export default FolderItem