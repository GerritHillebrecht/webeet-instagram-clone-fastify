import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyReply,
    FastifyRequest,
} from "fastify"
import { taggedPostsService } from "./tagged.service"
import { CreateTaggedPostDto } from "./tagged.types"

interface TaggedGridRoute {
    Querystring: {
        userId?: string
    }
}

export const taggedRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = taggedPostsService(fastify)

    fastify.get(
        "/tagged/grid",
        async (
            request: FastifyRequest<TaggedGridRoute>,
            reply: FastifyReply
        ) => {
            const taggedPosts = await service.getPostsByTaggedUserId(
                Number(request.query?.userId ?? 1)
            )

            // Return a 200 OK status code with the list of posts
            return reply.code(200).send(taggedPosts ?? [])
        }
    )

    fastify.post(
        "/tagged",
        async (
            request: FastifyRequest<{ Body: CreateTaggedPostDto }>,
            reply: FastifyReply
        ) => {
            const { post_id, user_id = 1 } = request.body
            const taggedPost = await service.createTaggedPost(post_id, user_id)

            // Return a 201 Created status code with the new tagged post object
            return reply.code(201).send(taggedPost)
        }
    )
}
