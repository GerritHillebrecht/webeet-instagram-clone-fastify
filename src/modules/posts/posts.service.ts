import type { FastifyInstance } from "fastify"
import { CreatePostDto } from "./posts.types"

const postsService = (fastify: FastifyInstance) => {
    return {
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

export { postsService }
