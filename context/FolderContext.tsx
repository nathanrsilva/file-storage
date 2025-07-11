'use client'

import { FolderType } from '@/util/types/folder.files.types'
import React, { createContext, useContext, useState } from 'react'

type FolderContextType = {
    folderState: FolderType,
    setFolderState: React.Dispatch<React.SetStateAction<FolderType>>
}

const FolderContext = createContext<FolderContextType>({} as FolderContextType)

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {

    const [folderState, setFolderState] = useState<FolderType>({
        files: [],
        total_files: 0
    })

    return (
        <FolderContext.Provider value={{ folderState, setFolderState }}>
            {children}
        </FolderContext.Provider>
    )

}

export const useFolder = () => useContext(FolderContext)
