import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyReply,
    FastifyRequest,
} from "fastify"
import { storiesService } from "./stories.service"
import { ConnectStoryToPostDto, CreateStoryDto } from "./stories.types"

export const storiesRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = storiesService(fastify)

    fastify.get("/stories", async (request, reply) => {
        const stories = await service.getAll()

        const parsedStories = stories.map((story: any) => ({
            ...story,
            posts: JSON.parse(story.posts).filter((p: any) => p !== null),
        }))

        // Return a 200 OK status code with the list of stories
        return reply.code(200).send(parsedStories)
    })

    fastify.post<{ Body: ConnectStoryToPostDto }>(
        "/stories/connect",
        async (
            request: FastifyRequest<{
                Body: ConnectStoryToPostDto
            }>,
            reply: FastifyReply
        ) => {
            const { post_id, story_id } = request.body
            const result = await service.connectStoryToPost(story_id, post_id)

            // Return a 200 OK status code with the result
            return reply.code(200).send(result)
        }
    )

    fastify.get(
        "/stories/:user_id",
        async (
            request: FastifyRequest<{ Params: { user_id: string } }>,
            reply: FastifyReply
        ) => {
            const userId = Number(request.params.user_id)
            const stories = await service.getById(userId)

            const parsedStories = stories.map((story: any) => ({
                ...story,
                posts: JSON.parse(story.posts).filter((p: any) => p !== null),
            }))

            // Return a 200 OK status code with the story for the given ID
            return reply.code(200).send(parsedStories)
        }
    )

    fastify.post<{ Body: CreateStoryDto }>(
        "/stories",
        async (
            request: FastifyRequest<{ Body: CreateStoryDto }>,
            reply: FastifyReply
        ) => {
            console.log("Creating story with data:", request.body)
            const story = await service.create(request.body)

            // Return a 201 Created status code with the new story object
            return reply.code(201).send(story)
        }
    )
}
