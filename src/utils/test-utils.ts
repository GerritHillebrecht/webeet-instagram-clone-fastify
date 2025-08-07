// test-utils.ts
import type { TransactionHelpers } from "@/core/database/database.transactions"

type PartialModules<T> = {
    [K in keyof T]?: Partial<T[K]>
}

export const createMockTransactionHelpers = (
    overrides: PartialModules<TransactionHelpers> = {}
): TransactionHelpers => {
    const defaultMock: TransactionHelpers = {
        posts: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
        },
        reels: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
        },
        tagged: {
            getTaggedPostsByUserId: jest.fn(),
            createTaggedPost: jest.fn(),
        },
        stories: {
            getStoriesByUserId: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
            connectStoryToPost: jest.fn(),
        },
        highlights: {
            getHighlightsByUserId: jest.fn(),
            create: jest.fn(),
        },
    }

    // Deep merge der overrides
    return {
        posts: {
            ...defaultMock.posts,
            ...overrides.posts,
        },
        reels: {
            ...defaultMock.reels,
            ...overrides.reels,
        },
        tagged: {
            ...defaultMock.tagged,
            ...overrides.tagged,
        },
        stories: {
            ...defaultMock.stories,
            ...overrides.stories,
        },
        highlights: {
            ...defaultMock.highlights,
            ...overrides.highlights,
        },
    }
}
