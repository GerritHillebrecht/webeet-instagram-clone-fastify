import { create } from "domain"
import type { FastifyInstance } from "fastify"
import { CreateHighlightDto } from "./highlights.types"

export const highlightsService = (fastify: FastifyInstance) => {
    return {
        create: async (highlightData: CreateHighlightDto) => {
            fastify.log.info(`Creating a new highlight`, highlightData)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const highlight =
                fastify.transactions.highlights.create(highlightData)
            fastify.log.info(`Highlight created successfully`, highlight)
            return highlight
        },
        getHighlightsByUserId: async (id: number) => {
            fastify.log.info(`Fetching highlights for user with ID: ${id}`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const highlights =
                fastify.transactions.highlights.getHighlightsByUserId(id)
            return highlights
        },
    }
}
