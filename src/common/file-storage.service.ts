import path from "path"
import fs from "fs/promises"
import { v4 as uuid } from "uuid"
import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const fileStorageService = {
    async saveImage(
        fileBuffer: Buffer,
        originalFilename: string
    ): Promise<string> {
        const mediaDir = process.env.FILE_UPLOAD_DIR || "uploads"
        const uploadDir = path.join(process.cwd(), "public", mediaDir)
        await fs.mkdir(uploadDir, { recursive: true }) // Ensure directory exists

        const fileExtension = path.extname(originalFilename)
        const uniqueFilename = `${uuid()}${fileExtension}`
        const filePath = path.join(uploadDir, uniqueFilename)

        await fs.writeFile(filePath, fileBuffer)

        // Return the public URL path
        return `${process.env.BASE_URL || "http://localhost:3000"}/${mediaDir}/${uniqueFilename}`
    },
    async saveMedia(
        fileBuffer: Buffer,
        originalFilename: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" }, // Wichtig: 'auto' erkennt den Typ
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error)
                        return reject(new Error("Cloudinary upload failed."))
                    }
                    if (result && result.secure_url) {
                        resolve(result.secure_url)
                    } else {
                        reject(
                            new Error(
                                "Cloudinary upload failed: no URL returned."
                            )
                        )
                    }
                }
            )

            const readableStream = new Readable()
            readableStream.push(fileBuffer)
            readableStream.push(null)
            readableStream.pipe(uploadStream)
        })
    },
}
