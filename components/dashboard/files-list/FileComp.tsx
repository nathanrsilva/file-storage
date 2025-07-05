import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis, Pencil, Trash } from 'lucide-react'

function FileComp({fileName, uploadedAt, fileSize}: {fileName: string, uploadedAt: string, fileSize: string}) {
    return (
        <div className='h-20 w-full border-2 p-2 rounded-sm flex justify-between items-center'>

            <div className='flex items-center space-x-5'>
                <div className='w-15 h-15 relative rounded-sm overflow-hidden'>
                    <Image src={'/images/mountain.png'} alt={''} fill className='object-cover' />
                </div>
                <div>
                    <span className='text-md font-medium'>{fileName}</span>
                    <div className='text-sm text-gray-600'>
                        <span>{uploadedAt}</span>
                        <span> - </span>
                        <span>{fileSize}</span>
                    </div>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className='flex' asChild>
                    <Button variant={'ghost'} className='cursor-pointer border-none outline-none rounded-full'>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Pencil />
                        <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    )
}

export default FileComp