'use server'

import { cloudinary, streamifier } from "@/lib/cloudinary"
import fileComparison, { Comparision } from "@/util/fileComparision"

interface CloudinaryUploadResult{
    public_id: string,
    [key: string]: any,
}

//Promise<Comparision>
export async function uploadImage(prevState: any, formData: FormData)  {

    const file = formData.get('file') as File

    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'image-uploads',
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

    return fileComparison(originalSize, optimizedSize, publicId)
}