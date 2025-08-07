import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import path from "path"
import { databasePlugin } from "./core/database"
import { postsRoutes, reelsRoutes, taggedRoutes } from "./modules"
import { highlightRoutes } from "./modules/highlights"
import { storiesRoutes } from "./modules/stories/stories.routes"
import multipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"

import "./env"

const fastify = Fastify({
    logger: true,
})

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public"),
    prefix: "/", // oder z. B. '/static/' falls du nur unter dieser Route zugreifen willst
})

// Register multipart plugin
fastify.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
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

if (require.main === module) {
    const port = (process.env.PORT || 3000) as number

    fastify.listen({ port }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })
}

export default async (req: FastifyRequest, res: FastifyReply) => {
    await fastify.ready()
    fastify.server.emit("request", req, res)
}
