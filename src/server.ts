import Fastify from "fastify"
import { databasePlugin } from "src/core/database"
import { postsRoutes, reelsRoutes, taggedRoutes } from "./modules"
import { storiesRoutes } from "./modules/stories/stories.routes"
import { highlightRoutes } from "./modules/highlights"

const fastify = Fastify({
    logger: true,
})

// Register our database plugin
fastify.register(databasePlugin)

// Register routes
fastify.register(postsRoutes)
fastify.register(reelsRoutes)
fastify.register(taggedRoutes)
fastify.register(storiesRoutes)
fastify.register(highlightRoutes)

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
