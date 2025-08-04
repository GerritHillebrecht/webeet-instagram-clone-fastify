import type { Database } from "better-sqlite3"
import { CreatePostDto } from "src/modules/posts"
import { CreateReelDto } from "src/modules/reels"

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        // POSTS
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),

        // REELS
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare(
            "INSERT INTO reels (video_url, thumbnail_url, caption) VALUES (@video_url, @thumbnail_url, @caption) RETURNING *"
        ),
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

    return {
        posts,
        reels,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }
