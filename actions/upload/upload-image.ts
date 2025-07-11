'use server'

import { cloudinary, streamifier } from "@/lib/cloudinary"
import fileComparison, { Comparision } from "@/util/fileComparision"
import { createClient } from "@/util/supabase/server"
import { FolderType } from "@/util/types/folder.files.types"
import { getFolderFiles } from "../files/files-actions"

interface CloudinaryUploadResult {
    public_id: string,
    [key: string]: any,
}

export async function uploadImage(prevState: any, formData: FormData) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const file = formData.get('file') as File
    const folderName = formData.get('folder-name') as string

    const initialPath = user.id + '/'
    const folderToSave = folderName? initialPath + folderName : initialPath + 'All Files'

    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folderToSave,
                resource_type: 'image',
                transformation: [
                    {
                        fetch_format: 'auto',
                        quality: 'auto'
                    }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result as CloudinaryUploadResult)
                }
            })

        streamifier.createReadStream(buffer).pipe(uploadStream)
    })

    const originalSize = file.size
    const optimizedSize = uploadResult.bytes
    const publicId = uploadResult.public_id

    const resultFolderFiles = await getFolderFiles(folderName as string, null)
    
    return {
        folderComparision: fileComparison(originalSize, optimizedSize, publicId),
        resultFolderFiles: resultFolderFiles as FolderType
    }

}