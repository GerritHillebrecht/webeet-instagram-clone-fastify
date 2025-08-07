import Fastify from "fastify"
import { storiesRoutes } from "./stories.routes"
import { createMockTransactionHelpers } from "../../utils/test-utils"

describe("STORIES ROUTES", () => {
    let app: ReturnType<typeof Fastify>
    let mockTransactions: ReturnType<typeof createMockTransactionHelpers>

    beforeEach(() => {
        app = Fastify()
        mockTransactions = createMockTransactionHelpers()
        app.decorate("transactions", mockTransactions)
        app.register(storiesRoutes)
    })

    afterEach(async () => {
        await app.close()
    })

    describe("GET /stories/:user_id", () => {
        it("should return a list of tagged posts with a 200 status code", async () => {
            const stories = [
                {
                    id: 1,
                    title: "Welcome to Miami",
                    content: "What a beautiful city!",
                },
                {
                    id: 2,
                    title: "A Day in New York",
                    content: "The city that never sleeps.",
                },
            ]

            mockTransactions.stories.getStoriesByUserId = jest
                .fn()
                .mockReturnValue(stories)

            const { statusCode, payload } = await app.inject({
                method: "GET",
                url: "/stories/1",
            })

            expect(statusCode).toBe(200)
            expect(JSON.parse(payload)).toEqual(stories)
        })
    })
})
