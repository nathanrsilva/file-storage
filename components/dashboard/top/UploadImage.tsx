'use client'

import { uploadImage } from '@/actions/upload/upload-image';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input';
import { Comparision } from '@/util/fileComparision';
import { Image } from 'lucide-react';
import React, { useActionState, useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CldImage } from 'next-cloudinary';
import { useFolder } from '@/context/FolderContext';

function UploadImage({folderName}: {folderName?: string}) {

    const [state, formAction, isPending] = useActionState(uploadImage, null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [hasResult, setHasResult] = useState(false)

    const {setFolderState} = useFolder()

    useEffect(() => {

        if (isPending || state) {
            setDialogOpen(true)
            return
        }


    }, [isPending, state])

    useEffect(()=>{

        if(state){
            setHasResult(true)
            setFolderState(state.resultFolderFiles)
            return
        }

    }, [state])

    return (
        <>
            <DropdownMenuItem onSelect={(e) => { e.preventDefault() }} className='p-0'>

                <label htmlFor='upload-image' className='flex w-full cursor-pointer items-center space-x-2 p-2'>
                    <Image className='ml-1'/>
                    <span>Image</span>
                </label>

                <form action={formAction}>

                    <Input
                    readOnly
                    hidden
                    name='folder-name'
                    value={folderName}
                    />

                    <Input id='upload-image' className='hidden' type='file' name='file' onChange={(e) => {
                        if (!e.target.files?.[0]) return;

                        const form = e.target.form
                        form?.requestSubmit()
                    }} />

                </form>

            </DropdownMenuItem>

            <AlertDialog open={dialogOpen}>
                <AlertDialogContent className='flex flex-col items-center'>
                    <AlertDialogHeader className='text-center'>
                        <AlertDialogTitle>
                            {isPending? 
                            <p>Uploading image. Please wait a moment...</p> 
                            : 
                            <p>Image saved and optimized</p>}
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            {isPending && <div className='text-2xl'>Optimizing image...</div>}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {hasResult && (
                        <div className="mt-5 border rounded-md text-center p-5 space-y-2">

                            <div className='w-full h-50 relative'>
                                <CldImage src={state?.folderComparision.publicId as string} fill alt={'uploaded image'} className='object-contain rounded-sm' />
                            </div>

                            <div className='flex justify-center space-x-5 font-medium'>

                                <div 
                                className='border-1 w-23 space-y-1 p-2 rounded-sm text-white bg-black'
                                >
                                    <p className='border-1 text-sm text-rose-300 border-red-200'>{state?.folderComparision.original.size}</p>
                                    <p className='uppercase text-sm font-bold text-rose-300'>Original</p>
                                </div>

                                <div 
                                className='border-1 w-23 space-y-1 p-2 rounded-sm text-white bg-black'
                                >
                                    <p className='border-1 text-sm text-green-300 border-green-300'>{state?.folderComparision.optimized.size}</p>
                                    <p className='uppercase text-sm font-bold text-green-300'>Optimized</p>
                                </div>

                            </div>

                            <h2 className='uppercase font-bold text-green-500'>Percent Saved</h2>
                            {<div className="flex justify-center">
                                <div className="relative w-24 h-24">
                                    <svg className="transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-black"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="text-green-500"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeDasharray={`${state?.folderComparision.saved.percent}, 100`}
                                            fill="none"
                                            d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                                        {state?.folderComparision.saved.percent}%
                                    </div>
                                </div>
                            </div>}

                        </div>
                    )}

                    <AlertDialogFooter>

                        <AlertDialogCancel 
                        disabled={isPending} 
                        className='bg-black text-white disabled:bg-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer' 
                        onClick={() => {
                            setDialogOpen(false)
                            setHasResult(false)
                        }}>
                            {isPending? 
                            <p>Uploading image...</p> 
                            : 
                            <p>Close</p>}
                        </AlertDialogCancel>


                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>


    )
}

export default UploadImage