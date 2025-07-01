import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app/AppSidebar'
import '../globals.css'

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <html lang='en'>
                <body>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}

export default MainLayout