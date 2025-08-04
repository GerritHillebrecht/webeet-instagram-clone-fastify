import Fastify from "fastify"

const fastify = Fastify({
    logger: true,
})

// A simple health-check route
fastify.get("/", async function (request, reply) {
    return { hello: "world" }
})

const port = (process.env.PORT || 3000) as number

const start = async () => {
    try {
        await fastify.listen({ port, host: "0.0.0.0" })
        console.log(`🚀 Server is now listening on http://127.0.0.1:${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
