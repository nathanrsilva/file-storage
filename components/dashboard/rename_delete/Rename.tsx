'use client'


import { renameFile } from '@/actions/files/files-actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFolder } from '@/context/FolderContext'
import { FolderType } from '@/util/types/folder.files.types'
import { Pencil } from 'lucide-react'
import React, { useActionState, useEffect } from 'react'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from '@radix-ui/react-dialog'

function Rename(
    { action, label, public_id, folderName }
    :
    { action: any, label: 'file' | 'folder', public_id?: string, folderName?: string }) 
{
    const { setFolderState } = useFolder()

    return (
        <Dialog>
            <DialogTrigger className='w-full p-0' asChild>
                <Button
                    variant={'ghost'}
                    className='w-full font-normal flex justify-start cursor-pointer text-blue-700'>
                    <Pencil />
                    <span>Rename</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Rename File</DialogTitle>
                        <DialogDescription>Rename File</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>

                <form className="grid gap-3" action={label === 'folder' ? action
                    :
                    async (formData: FormData) => {
                        const result = await action(formData)

                        setFolderState(result as FolderType)
                    }

                }>
                    <Label htmlFor={label === 'folder' ? 'folder-name' : 'folder-file'}>
                        {label === 'folder' ? 'Rename folder' : 'Rename file'}
                    </Label>

                    <Input
                        id={label === 'folder' ? 'folder-name' : 'folder-file'}
                        name={label === 'folder' ? 'folder-name' : 'folder-file'} />

                    {label === 'folder' ?
                        <Input
                            readOnly
                            hidden
                            name={'old-folder'}
                            value={folderName}
                        />
                        :
                        <Input
                            readOnly
                            hidden
                            name={'public-file'}
                            value={public_id}
                        />
                    }

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className='cursor-pointer'>
                            {label === 'folder' ? 'Rename folder' : 'Rename file'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default Rename