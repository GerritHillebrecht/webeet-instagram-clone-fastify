import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyRequest,
} from "fastify"
import { postsService } from "./posts.service"
import { CreatePostDto, createPostDtoSchema } from "./posts.types"
import z from "zod"

export const postsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = postsService(fastify)

    fastify.get("/posts", async (request, reply) => {
        const posts = await service.getAll()

        // Return a 200 OK status code with the list of posts
        return reply.code(200).send(posts)
    })

    fastify.get(
        "/posts/:post_id",
        async (
            request: FastifyRequest<{ Params: { post_id: string } }>,
            reply
        ) => {
            const post = await service.getById(Number(request.params.post_id))

            if (!post) {
                return reply.code(404).send({ message: "Post not found" })
            }

            return reply.code(200).send(post)
        }
    )

    fastify.post<{ Body: Omit<CreatePostDto, "img_url"> }>(
        "/posts/media",
        async (request, reply) => {
            if (!request.isMultipart()) {
                reply.code(415).send({ message: "Request must be multipart" })
                return
            }
            const parts = request.parts()

            let caption: string | undefined
            let imageFile: { buffer: Buffer; filename: string } | undefined

            for await (const part of parts) {
                if (part.type === "field") {
                    if (part.fieldname === "caption") {
                        caption = part.value as string
                    }
                } else if (part.type === "file") {
                    // Read the file stream into a buffer
                    const buffers: Buffer[] = []
                    for await (const chunk of part.file) {
                        buffers.push(chunk)
                    }
                    imageFile = {
                        buffer: Buffer.concat(buffers),
                        filename: part.filename,
                    }
                }
            }

            if (!imageFile && !caption) {
                return reply
                    .code(400)
                    .send({ message: "Either image or caption is required." })
            }

            try {
                // We can still validate the caption if it exists
                if (caption) {
                    createPostDtoSchema
                        .pick({ caption: true })
                        .parse({ caption })
                }

                const newPost = await service.createWithMedia({
                    caption: caption || "", // Pass empty string if no caption, or adjust logic
                    imageFile,
                })

                return reply.code(201).send(newPost)
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return reply.code(400).send({
                        message: "Validation failed",
                        errors: error.errors,
                    })
                }
                fastify.log.error(error)
                return reply
                    .code(500)
                    .send({ message: "Failed to create post" })
            }
        }
    )

    fastify.post<{ Body: CreatePostDto }>("/posts", async (request, reply) => {
        const newPost = await service.create(request.body)

        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newPost)
    })
}
