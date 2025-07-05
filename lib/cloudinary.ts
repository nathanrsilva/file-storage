import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

export {cloudinary, streamifier}