import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyReply,
    FastifyRequest,
} from "fastify"
import { highlightsService } from "./highlights.service"
import { CreateHighlightDto } from "./highlights.types"

export const highlightRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    fastify.get(
        "/highlights/:user_id",
        async (
            request: FastifyRequest<{ Params: { user_id: string } }>,
            reply: FastifyReply
        ) => {
            const highlights = await service.getHighlightsByUserId(
                Number(request.params.user_id)
            )

            const parsedHighlights = highlights.map((highlight: any) => ({
                ...highlight,
                posts: JSON.parse(highlight.posts).filter(
                    (p: any) => p !== null
                ),
            }))

            // Return a 200 OK status code with the list of posts
            return reply.code(200).send(parsedHighlights)
        }
    )

    fastify.post<{ Body: CreateHighlightDto }>(
        "/highlights",
        async (request, reply) => {
            const newHighlight = await service.create(request.body)

            // Return a 201 Created status code with the new post object
            return reply.code(201).send(newHighlight)
        }
    )
}
