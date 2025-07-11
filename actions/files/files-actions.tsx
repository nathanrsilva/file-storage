'use server'

import { cloudinary } from "@/lib/cloudinary"
import { createClient } from "@/util/supabase/server"
import { FolderFiles, FolderType } from "@/util/types/folder.files.types"

export async function getFolderFiles(folderName: string, initialState: any, formData?: FormData) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // if (!user) throw new Error('User not authenticated')

    try {
        const result: FolderFiles =
            await cloudinary.api.resources_by_asset_folder(user?.id + '/' + folderName)

        return {
            files: result.resources || [],
            total_files: result.resources.length
        }

    } catch (error) {
        console.error(error)
    }

}

export async function renameFile(formData: FormData) {

    const newFileName = formData.get('folder-file') as string
    const publicId = formData.get('public-file') as string

    try {
        const result = await cloudinary.api.update(publicId, { display_name: newFileName })

        const folderName = (result.asset_folder as string).split('/').pop()

        const resultFolderFiles = await getFolderFiles(folderName as string, null)

        return resultFolderFiles as FolderType

    } catch (error) {
        console.error(error)
    }

}

export async function deleteFile(formData: FormData) {

    const publicId = formData.get('public-file') as string
    const folderName = formData.get('folder-name') as string

    console.log(publicId)
    console.log(folderName)

    try {
        const result = await cloudinary.api.delete_resources([publicId])
        
        const resultFolderFiles = await getFolderFiles(folderName, null)

        return resultFolderFiles as FolderType

    } catch (error) {
        console.error(error)
    }

}