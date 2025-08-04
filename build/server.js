"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
// A simple health-check route
fastify.get("/", async function (request, reply) {
    return { hello: "world" };
});
const port = (process.env.PORT || 3000);
const start = async () => {
    try {
        await fastify.listen({ port, host: "0.0.0.0" });
        console.log(`🚀 Server is now listening on http://127.0.0.1:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
