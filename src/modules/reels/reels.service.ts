import type { FastifyInstance } from "fastify"
import { CreateReelDto } from "./reels.types"

export const reelsService = (fastify: FastifyInstance) => {
    return {
        create: async (reelData: CreateReelDto) => {
            fastify.log.info(`Creating a new reel`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const reel = fastify.transactions.reels.create(reelData)
            return reel
        },
        getAll: async () => {
            fastify.log.info(`Fetching all reels`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const reels = fastify.transactions.reels.getAll()
            return reels
        },
        getById: async (id: number) => {
            fastify.log.info(`Fetching reel with ID: ${id}`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const reel = fastify.transactions.reels.getById(id)
            return reel
        },
    }
}
