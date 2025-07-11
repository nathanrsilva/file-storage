'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useFolder } from '@/context/FolderContext'
import { FolderType } from '@/util/types/folder.files.types'
import { Trash } from 'lucide-react'
import React, { useActionState, useEffect } from 'react'

function Delete(
    { action, label, public_id, folderName }
    :
    { action: any, label: 'file' | 'folder', public_id?: string, folderName?: string }) 
{

    const { setFolderState } = useFolder()

    return (
        <DropdownMenuItem className='p-0' asChild>
            <form
                action={label === 'folder' ? action
                    :
                    async (formData: FormData) => {
                        const result = await action(formData)
                        console.log(result)

                        setFolderState(result as FolderType)
                    }
                }
                className='w-full p-0'>

                {label === 'folder' ?
                    <div>
                        <Input
                            readOnly
                            hidden
                            name={'folder-name'}
                            value={folderName}
                        />
                    </div>
                    :
                    <div>
                        <Input
                            readOnly
                            hidden
                            name={'public-file'}
                            value={public_id}
                        />

                        <Input
                            readOnly
                            hidden
                            name={'folder-name'}
                            value={folderName}
                        />
                    </div>
                }

                <Button type='submit'
                    variant={'ghost'}
                    className='w-full flex justify-start p-0 cursor-pointer font-normal
                    text-red-600 relative'>
                    <Trash className='text-red-600 absolute left-1' />
                    <span className='ml-4'>Delete</span>
                </Button>
            </form>
        </DropdownMenuItem >
    )
}

export default Delete