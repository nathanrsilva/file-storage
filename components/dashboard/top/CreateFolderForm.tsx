import { createFolder } from '@/actions/folders/folders-actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FolderPlus } from 'lucide-react'
import React from 'react'

function CreateFolderForm() {

    return (
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

                <form className="grid gap-3" action={createFolder}>
                    <Label htmlFor="folder-name">Folder Name</Label>
                    <Input id="folder-name" name="folder-name" />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className='cursor-pointer'>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFolderForm