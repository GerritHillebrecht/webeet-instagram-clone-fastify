import { z } from "zod"
import { postSchema } from "../posts"

// First, we define the zod schemas
export const createTaggedPostDtoSchema = z.object({
    user_id: postSchema.shape.id,
    post_id: z.number(),
})

export const taggedPostSchema = z.object({
    ...postSchema.shape,
    post_id: z.number(),
    user_id: z.number(),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
export const taggedPostsSchema = z.array(taggedPostSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
export type CreateTaggedPostDto = z.infer<typeof createTaggedPostDtoSchema>
export type TaggedPost = z.infer<typeof taggedPostSchema>
