import React from 'react'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'

function SidebarItemComponent({ children }: { children: React.ReactNode }) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton>
                {children}
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default SidebarItemComponent