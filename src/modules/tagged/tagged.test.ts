import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"
import { createMockTransactionHelpers } from "../../utils/test-utils"

describe("TAGGED ROUTES", () => {
    let app: ReturnType<typeof Fastify>
    let mockTransactions: ReturnType<typeof createMockTransactionHelpers>

    beforeEach(() => {
        app = Fastify()
        mockTransactions = createMockTransactionHelpers()
        app.decorate("transactions", mockTransactions)
        app.register(taggedRoutes)
    })

    afterEach(async () => {
        await app.close()
    })

    describe("GET /tagged/grid", () => {
        it("should return a list of tagged posts with a 200 status code", async () => {
            const taggedPosts = [
                {
                    id: 1,
                    post_id: 1,
                    user_id: 1,
                },
                {
                    id: 2,
                    post_id: 2,
                    user_id: 1,
                },
            ]

            mockTransactions.tagged.getTaggedPostsByUserId = jest
                .fn()
                .mockReturnValue(taggedPosts)

            const { statusCode, payload } = await app.inject({
                method: "GET",
                url: "/tagged/grid",
            })

            expect(statusCode).toBe(200)
            expect(JSON.parse(payload)).toEqual(taggedPosts)
        })
    })
})
