import type { FastifyInstance } from "fastify"

export const taggedPostsService = (fastify: FastifyInstance) => {
    return {
        getPostsByTaggedUserId: async (userId: number = 1) => {
            fastify.log.info(`Fetching posts tagged by user with ID: ${userId}`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const posts =
                fastify.transactions.tagged.getTaggedPostsByUserId(userId)
            return posts
        },

        createTaggedPost: async (postId: number, userId: number = 1) => {
            fastify.log.info(
                `Creating tagged post with post ID: ${postId} for user ID: ${userId}`
            )
            const taggedPost = fastify.transactions.tagged.createTaggedPost(
                postId,
                userId
            )
            return taggedPost
        },
    }
}
