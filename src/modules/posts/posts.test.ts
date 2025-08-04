import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code (only works as long as the full request-body is returned)", async () => {
        const app = Fastify()

        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        })

        app.register(postsRoutes)

        const { statusCode, payload } = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        })

        expect(statusCode).toBe(201)
        expect(JSON.parse(payload)).toEqual(createdPost)
    })
})

describe("GET /posts", () => {
    it("should return all posts with a 200 status code", async () => {
        const app = Fastify()

        const posts = [
            {
                id: 1,
                img_url: "http://example.com/image1.jpg",
                caption: "First post",
            },
            {
                id: 2,
                img_url: "http://example.com/image2.jpg",
                caption: "Second post",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                create: jest.fn(),
                getAll: jest.fn().mockReturnValue(posts),
            },
        })

        app.register(postsRoutes)

        const { statusCode, payload } = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(statusCode).toBe(200)
        expect(JSON.parse(payload)).toEqual(posts)
    })
})
