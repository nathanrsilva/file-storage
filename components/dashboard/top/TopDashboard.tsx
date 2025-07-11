'use client'

import { Progress } from '@/components/ui/progress'
import React, { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Upload } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

import UploadImage from './UploadImage';
import { Comparision } from '@/util/fileComparision';
import CreateFolderForm from './CreateFolderForm'

function TopDashboard() {

    const [uploadState, setUploadState] = useState<Comparision | null>(null);
    const [isUploading, setIsUploading] = useState(false)

    return (
        <div className='w-[95%] space-y-5 mt-10'>

            <div>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
            </div>

            <div className='flex items-center space-x-5'>
                <DropdownMenu open={isUploading ? true : undefined}>
                    <DropdownMenuTrigger className='flex' asChild>
                        <Button className='cursor-pointer'>
                            <Upload />
                            <span>Upload</span>
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <UploadImage />

                    </DropdownMenuContent>
                </DropdownMenu>

                <CreateFolderForm />
            </div>
        </div>
    )
}

export default TopDashboard