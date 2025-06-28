import React from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '../ui/sidebar'

function SidebarGroupComponent({ children, label }: { children: React.ReactNode, label: string }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {children}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default SidebarGroupComponent