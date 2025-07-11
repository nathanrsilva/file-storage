'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { CldImage } from 'next-cloudinary';
import Rename from '../rename_delete/Rename';
import { deleteFile, renameFile } from '@/actions/files/files-actions';
import Delete from '../rename_delete/Delete';


function FileComp(
    { public_id, fileName, createdAt, fileSize, folderName }:
    { public_id: string, fileName: string, createdAt: string, fileSize: string, folderName: string }) 
{

    return (
        <div className='h-20 w-full border-2 p-2 rounded-sm flex justify-between items-center relative'>

            <div className='flex items-center space-x-5 w-9/10 '>

                <div className='w-20 h-15 relative rounded-sm'>
                    <CldImage src={public_id} alt={fileName} fill className='object-contain' />
                </div>

                <div className=' w-2/3'>
                    <span className='text-sm font-medium line-clamp-1 lg:text-md'>{fileName}</span>

                    <div className='text-sm text-gray-600'>
                        <span>{createdAt}</span>
                        <span> - </span>
                        <span>{fileSize}</span>
                    </div>
                </div>

            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className='flex absolute right-0' asChild>
                    <Button variant={'ghost'} className='cursor-pointer border-none outline-none rounded-full'>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Rename action={renameFile} label='file' public_id={public_id} />
                    <Delete action={deleteFile} label='file' public_id={public_id} folderName={folderName} />
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    )
}

export default FileComp