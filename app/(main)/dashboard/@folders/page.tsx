import { getFolders } from '@/actions/folders/folders-actions'
import FoldersList from '@/components/dashboard/folders-list/FoldersList'
import React from 'react'

async function FoldersPage() {

    const folders = await getFolders()

    return (
        <>
            <FoldersList folders={folders}/>
        </>
    )
}

export default FoldersPage