import type { Database } from "better-sqlite3"
import { CreateHighlightDto } from "../../modules/highlights"
import { CreatePostDto } from "../../modules/posts"
import { CreateReelDto } from "../../modules/reels"
import { CreateStoryDto } from "../../modules/stories"
import {
    createHighlightStatements,
    createPostStatements,
    createReelStatements,
    createStoriesStatements,
    createTaggedStatements,
} from "./statements"

// This factory function creates and returns our transaction helpers.
export const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        ...createPostStatements(db),
        ...createReelStatements(db),
        ...createTaggedStatements(db),
        ...createStoriesStatements(db),
        ...createHighlightStatements(db),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: CreatePostDto) => {
            return statements.createPost.get(data)
        },
    }

    const reels = {
        getById: (id: number) => {
            return statements.getReelById.get(id)
        },
        getAll: () => {
            return statements.getAllReels.all()
        },
        create: (data: CreateReelDto) => {
            return statements.createReel.get(data)
        },
    }

    const tagged = {
        getTaggedPostsByUserId: (id: number) => {
            return statements.getTaggedPostsByUserId.get(id)
        },
        createTaggedPost: (postId: number, userId: number) => {
            return statements.createTaggedPost.get({
                post_id: postId,
                user_id: userId,
            })
        },
    }

    const stories = {
        getStoriesByUserId: (userId: number) => {
            return statements.getStoriesByUserId.all(userId)
        },
        getAll: () => {
            return statements.getAllStories.all()
        },
        create: (storyData: CreateStoryDto) => {
            const { title, content, user_id, is_highlight = false } = storyData

            return statements.createStory.get({
                title,
                content,
                user_id,
                is_highlight: is_highlight ? 1 : 0, // Convert boolean to integer
            })
        },
        connectStoryToPost: (storyId: number, postId: number) => {
            return statements.connectStoryToPost.get({
                story_id: storyId,
                post_id: postId,
            })
        },
    }

    const highlights = {
        getHighlightsByUserId: (userId: number) => {
            return statements.getHightlightsByUserId.all(userId)
        },
        create: (highlightData: CreateHighlightDto) => {
            return statements.createHighlight.get(highlightData)
        },
    }

    return {
        posts,
        reels,
        tagged,
        stories,
        highlights,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
