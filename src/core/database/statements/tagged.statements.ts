import { Database } from "better-sqlite3"

export function createTaggedStatements(db: Database) {
    return {
        getTaggedPostsByUserId: db.prepare(`
            SELECT pu.*, p.* FROM posts_users pu
            INNER JOIN posts p ON pu.post_id = p.id
            WHERE pu.user_id = ?
        `),
        createTaggedPost: db.prepare(
            "INSERT INTO posts_users (post_id, user_id) VALUES (@post_id, @user_id) RETURNING *"
        ),
    }
}
