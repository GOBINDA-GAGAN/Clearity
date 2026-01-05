
import { v2 as cloudinary } from "cloudinary"
import config from "@/config/config"
import type { UploadApiResponse } from "cloudinary"


cloudinary.config({
    cloud_name: config.Cloudinary_Name,
    api_key: config.Cloudinary_API_Key,
    api_secret: config.Cloudinary_API_Secret,
    secure: config.NODE_ENV === "production"
})

export const uploadTocloudnary = (buffer: Buffer<ArrayBufferLike>, publicId: string): Promise<UploadApiResponse | undefined> => {
    return new Promise((resolve, rejects) => {
        cloudinary.uploader.upload_stream({
            allowed_formats: ['png', "jpg", 'webp'],
            resource_type: "image",
            folder: "blog-api",
            public_id: publicId,
            transformation: { quality: 'auto' }
        }, (err, result) => {
            if (err) {
                console.log("error in image upload", err);
                rejects(err)

            }
            resolve(result)
        }).end(buffer)
    })

}