import { Database } from "better-sqlite3"

export function createReelStatements(db: Database) {
    return {
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare(
            "INSERT INTO reels (video_url, thumbnail_url, caption) VALUES (@video_url, @thumbnail_url, @caption) RETURNING *"
        ),
    }
}
