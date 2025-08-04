import Fastify from "fastify"
import { databasePlugin } from "./core/database/database.plugin"
import { postsRoutes } from "./modules/posts/posts.routes"
import { reelsRoutes } from "./modules/reels"

const fastify = Fastify({
    logger: true,
})

// Register our database plugin
fastify.register(databasePlugin)

// Register routes
fastify.register(postsRoutes)
fastify.register(reelsRoutes)

// Declare a default route
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" })
})

const port = (process.env.PORT || 3000) as number

fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
