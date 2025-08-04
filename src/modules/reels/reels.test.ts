import Fastify from "fastify"
import { reelsRoutes } from "./reels.routes"

describe("GET /reels/grid", () => {
    it("should return a list of reels with a 200 status code", async () => {
        const app = Fastify()
        const mockReels = [
            {
                id: 1,
                video_url:
                    "[http://example.com/video1.mp4](http://example.com/video1.mp4)",
                thumbnail_url:
                    "[http://example.com/thumb1.png](http://example.com/thumb1.png)",
                caption: "Reel 1",
                views: 100,
            },
            {
                id: 2,
                video_url:
                    "[http://example.com/video2.mp4](http://example.com/video2.mp4)",
                thumbnail_url:
                    "[http://example.com/thumb2.png](http://example.com/thumb2.png)",
                caption: "Reel 2",
                views: 200,
            },
        ]

        // To satisfy TypeScript, our mock must match the full shape of the
        // 'transactions' dependency, including all methods on 'posts'.
        app.decorate("transactions", {
            posts: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
            reels: {
                getAll: jest.fn().mockReturnValue(mockReels),
            },
        })

        app.register(reelsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/reels/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockReels)
    })
})
