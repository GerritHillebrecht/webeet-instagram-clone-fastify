import type { FastifyInstance } from "fastify"
import { CreatePostDto, CreatePostDtoWithMedia } from "./posts.types"
import { fileStorageService } from "src/common"

export const postsService = (fastify: FastifyInstance) => {
    return {
        createWithMedia: async (postData: CreatePostDtoWithMedia) => {
            fastify.log.info(`Creating a new post with media`, postData)

            let img_url = postData.caption // Fallback if no image, or placeholder

            if (postData.imageFile) {
                // If an image is provided, save it and get the URL
                img_url = await fileStorageService.saveImage(
                    postData.imageFile.buffer as Buffer,
                    postData.imageFile.filename
                )
            }

            const post = fastify.transactions.posts.create({
                img_url: img_url as string,
                caption: postData.caption,
            })
            return post
        },
        create: async (postData: CreatePostDto) => {
            fastify.log.info(`Creating a new post`, postData)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.create(postData)
            fastify.log.info(`Post created successfully`, post)
            return post
        },
        getAll: async () => {
            fastify.log.info(`Fetching all posts`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const posts = fastify.transactions.posts.getAll()
            return posts
        },
        getById: async (id: number) => {
            fastify.log.info(`Fetching post with ID: ${id}`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.getById(id)
            return post
        },
    }
}
