'use client'

import { useFolder } from "@/context/FolderContext"
import FileComp from "./FileComp"
import formatFileSize from "@/util/formSize"
import { FileType } from "@/util/types/folder.files.types"

function FilesList() {

    const { folderState } = useFolder()

    return (
        <div className="w-full space-y-3">
            {folderState.total_files > 0 ?
                folderState.files.map((folder: FileType) => (
                    <FileComp
                        key={folder.public_id}
                        folderName={(folder.asset_folder).split('/').pop() as string}
                        public_id={folder.public_id}
                        fileName={folder.display_name + '.' + folder.format}
                        createdAt={new Date(folder.created_at).toLocaleDateString()}
                        fileSize={formatFileSize(folder.bytes)} />
                ))
                :
                <p className="text-center text-xl font-bold text-gray-300">No Files</p>
            }
        </div>
    )
}

export default FilesList