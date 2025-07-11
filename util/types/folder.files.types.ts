export type FileType = {
    asset_folder: string
    public_id: string,
    display_name: string,
    format: string,
    created_at: string,
    bytes: number
}

export type FolderType = {
    files: FileType[] | [],
    total_files: number
}

export type FolderFiles = { 
    resources: {
        [key: string]: string | number
    }[]
}