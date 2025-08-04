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
    }
}
