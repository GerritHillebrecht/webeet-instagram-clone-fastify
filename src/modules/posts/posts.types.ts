import { z } from "zod"

// First, we define the zod schemas
export const createPostDtoSchema = z.object({
    img_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

export const postSchema = z.object({
    id: z.number(),
    img_url: z.string().url(),
    caption: z.string().nullable(),
    created_at: z.string(),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
export const postsSchema = z.array(postSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
export type CreatePostDto = z.infer<typeof createPostDtoSchema>
export type Post = z.infer<typeof postSchema>
