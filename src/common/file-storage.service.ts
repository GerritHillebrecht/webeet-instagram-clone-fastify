import path from "path"
import fs from "fs/promises"
import { v4 as uuid } from "uuid"
import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"

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
            // Cloudinary kann den Dateityp (Image, Video) automatisch erkennen
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

            // Erstelle einen Stream aus dem Puffer und pipe ihn an Cloudinary
            const readableStream = new Readable()
            readableStream.push(fileBuffer)
            readableStream.push(null) // Signalisiert das Ende des Streams
            readableStream.pipe(uploadStream)
        })
    },
}
