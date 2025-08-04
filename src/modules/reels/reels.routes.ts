import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { reelsService } from "./reels.service"
import { CreateReelDto } from "./reels.types"

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = reelsService(fastify)

    fastify.get("/reels", async (request, reply) => {
        const reels = await service.getAll()

        // Return a 200 OK status code with the list of posts
        return reply.code(200).send(reels)
    })

    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll()

        // Return a 200 OK status code with the list of reels
        return reply.code(200).send(reels)
    })

    fastify.post<{ Body: CreateReelDto }>("/reels", async (request, reply) => {
        const newReel = await service.create(request.body)

        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newReel)
    })
}

export { reelsRoutes }
