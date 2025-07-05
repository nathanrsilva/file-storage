'use server'

import { cloudinary, streamifier } from "@/lib/cloudinary"
import fileComparison from "@/util/fileComparision"

interface CloudinaryUploadResult {
    public_id: string,
    bytes: number,
    duration?: number,

    [key: string]: any,
}

export async function uploadVideo(formData: FormData) {

    const file = formData.get('file') as File
    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream({
            folder: 'video-uploads',
            resource_type: 'video',
            transformation: [
                {
                    fetch_format: 'auto',
                    quality: 'auto'
                }
            ]
        },
            (error, result) => {
                if (error) reject(error)
                else resolve(result as CloudinaryUploadResult)
            })

        streamifier.createReadStream(buffer).pipe(uploadStream)
    })

    const originalSize = file.size
    const optimizedSize = uploadResult.bytes

    const comparison = fileComparison(originalSize, optimizedSize)

    console.log('Uploaded:', uploadResult)
    console.log('Comparison:', comparison)
}