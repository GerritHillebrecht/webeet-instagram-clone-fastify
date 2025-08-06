import type { FastifyInstance } from "fastify"
import { CreateStoryDto } from "./stories.types"
import { connect } from "http2"

export const storiesService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Fetching all strories`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const stories = fastify.transactions.stories.getAll()
            return stories
        },
        getById: async (id: number) => {
            fastify.log.info(`Fetching stories for user with ID: ${id}`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const stories = fastify.transactions.stories.getStoriesByUserId(id)
            return stories
        },
        create: async (storyData: CreateStoryDto) => {
            fastify.log.info(`Creating story`)
            const story = fastify.transactions.stories.create(storyData)
            return story
        },
        connectStoryToPost: async (storyId: number, postId: number) => {
            fastify.log.info(
                `Connecting story with ID: ${storyId} to post with ID: ${postId}`
            )
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const result = fastify.transactions.stories.connectStoryToPost(
                storyId,
                postId
            )
            return result
        },
    }
}
