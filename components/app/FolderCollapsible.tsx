'use client'

import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '../ui/sidebar'
import { ChevronRight } from 'lucide-react'
import { FolderClosed, FolderOpen } from 'lucide-react';

function FolderCollapsible({ folderName, children }: { folderName: string, children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible 
        open={isOpen}
        onOpenChange={setIsOpen} 
        className="group/collapsible" >

            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        {isOpen? <FolderOpen/> : <FolderClosed/>}       
                        {folderName}    
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {children}
                    </SidebarMenuSub>
                </CollapsibleContent>

            </SidebarMenuItem>
        </Collapsible>
    )
}

export default FolderCollapsible