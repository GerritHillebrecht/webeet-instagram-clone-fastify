import { Database } from "better-sqlite3"

export function createHighlightStatements(db: Database) {
    return {
        createHighlight: db.prepare(`
                    UPDATE stories 
                    SET is_highlight = 1 
                    WHERE id = ?;
                `),
        getHightlightsByUserId: db.prepare(`
                    SELECT 
                        s.*,
                        json_group_array(
                        CASE 
                            WHEN p.id IS NOT NULL 
                            THEN json_object(
                            'id', p.id,
                            'img_url', p.img_url,
                            'caption', p.caption,
                            'created_at', p.created_at
                            )
                            ELSE NULL
                        END
                        ) as posts
                    FROM stories s
                    LEFT JOIN stories_posts sp ON s.id = sp.story_id
                    LEFT JOIN posts p ON sp.post_id = p.id
                    WHERE s.user_id = ? AND s.is_highlight = 1
                    GROUP BY s.id, s.title, s.content, s.user_id, s.is_highlight, s.created_at
                `),
    }
}
