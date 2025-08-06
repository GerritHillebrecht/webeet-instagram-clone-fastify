import { Database } from "better-sqlite3"

export function createPostStatements(db: Database) {
    return {
        getPostById: db.prepare(
            "SELECT * FROM posts WHERE id = ? ORDER BY created_at DESC"
        ),
        getAllPosts: db.prepare("SELECT * FROM posts ORDER BY created_at DESC"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
    }
}
