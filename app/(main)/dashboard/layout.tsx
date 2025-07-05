import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app/AppSidebar'
import '@/app/globals.css'

function MainLayout(
    { children, top, folders, files }:
        {
            children: React.ReactNode,
            top: React.ReactNode,
            folders: React.ReactNode,
            files: React.ReactNode
        }) {
    return (
        <SidebarProvider>
            <html lang='en'>
                <body className='bg-gray-200'>
                    <AppSidebar />
                    <main className='w-screen relative p-5 space-y-15
                    
                    grid
                    lg:h-screen
                    lg:grid-cols-2
                    lg:gap-10
                    '


                    >
                        <SidebarTrigger className='absolute left-0' />
                        <div className='lg:col-span-2'>
                            {top}
                        </div>

                        <div className='bg-white h-full p-5 rounded-sm shadow-md overflow-y-scroll'>
                            <div>
                                <h2 className='mb-5 text-xl font-medium text-gray-600'>All Folders</h2>
                            </div>

                            {folders}
                        </div>

                        <div className='bg-white p-5 rounded-sm shadow-md'>
                            <div>
                                <h2 className='mb-5 text-xl font-medium text-gray-600'>Folder Name</h2>
                            </div>

                            <div className='overflow-y-scroll border-1 p-5 h-120 rounded-md'>
                                {files}
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}

export default MainLayout