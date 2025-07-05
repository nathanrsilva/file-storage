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

import { FolderPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import UploadImage from './UploadImage';
import { Comparision } from '@/util/fileComparision';

function TopDashboard() {

    const [uploadState, setUploadState] = useState<Comparision | null>(null);
    const [isUploading, setIsUploading] = useState(false)

    useEffect(()=>{
        console.log('DASHBOARD')
    })

    return (
        <div className='w-[95%] space-y-5 mt-10'>

            <div>
                <h1 className='text-3xl font-bold'>Dashboard</h1>

                <div>
                    <div className='flex space-x-5 font-medium text-gray-500'>
                        <h2>Storage</h2>
                        <p>2.5GB of 5GB used</p>
                    </div>
                    <Progress value={80} className='mt-2' />
                </div>
            </div>

            <div>

                <div>
                    <div className='flex items-center space-x-5'>
                        <DropdownMenu open={isUploading? true : undefined}>
                            <DropdownMenuTrigger className='flex' asChild>
                                <Button className='cursor-pointer'>
                                    <Upload />
                                    <span>Upload</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                                <UploadImage onComplete={setUploadState} />

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='cursor-pointer'>
                                    <FolderPlus />
                                    <span>New Folder</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>New Folder</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Folder Name</Label>
                                    <Input id="name-1" name="name" />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopDashboard