import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { postsService } from "./posts.service"
import { CreatePostDto } from "./posts.types"

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = postsService(fastify)

    fastify.get("/posts", async (request, reply) => {
        const posts = await service.getAll()

        // Return a 200 OK status code with the list of posts
        return reply.code(200).send(posts)
    })

    fastify.post<{ Body: CreatePostDto }>("/posts", async (request, reply) => {
        const newPost = await service.create(request.body)

        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newPost)
    })
}

export { postsRoutes }
