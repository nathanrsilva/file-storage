
'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react';
import React, { useActionState, useEffect } from 'react'
import Rename from '../rename_delete/Rename'
import Delete from '../rename_delete/Delete'
import { deleteFolder, renameFolder } from '@/actions/folders/folders-actions'
import { getFolderFiles } from '@/actions/files/files-actions'

import { useFolder } from '@/context/FolderContext'
import { FolderType } from '@/util/types/folder.files.types'
import { Input } from '@/components/ui/input'
import UploadImage from '../top/UploadImage'

function UnityFolder({ folderName }: { folderName: string }) {

    const getFoldersFileWithName = getFolderFiles.bind(null, folderName)

    const [state, formAction] = useActionState(getFoldersFileWithName, null)

    const { setFolderState } = useFolder()

    useEffect(() => {

        if (state) {
            setFolderState(state as FolderType)
        }

    }, [state])

    return (
        <form
            action={formAction}
            className='flex justify-between items-center rounded-sm border-2 shadow-md' 
        >
            <Button
                type="submit"
                variant="ghost"
                className='w-9/10 flex justify-start h-fit cursor-pointer'
            >
                <div className='flex items-center'>
                    <div className="w-15 h-15 relative rounded-sm overflow-hidden">
                        <Image src="/images/folderblue.png" alt="" fill className="object-cover" />
                    </div>

                    <div className="text-lg font-medium flex flex-col">
                        <p>{folderName}</p>
                    </div>
                </div>
            </Button>

            {folderName !== 'All Files' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="cursor-pointer border-none outline-none rounded-full"
                        >
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>

                        <DropdownMenuGroup>
                            <UploadImage folderName={folderName}/>
                            <Rename action={renameFolder} label="folder" folderName={folderName} />
                            <Delete action={deleteFolder} label='folder' folderName={folderName} />
                        </DropdownMenuGroup>

                    </DropdownMenuContent>

                </DropdownMenu>
            )}
        </form>

    )
}

export default UnityFolder