import { z } from "zod"

// First, we define the zod schemas
export const createStoryDtoSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10).max(1000),
    is_highlight: z.boolean().optional(),
    user_id: z.number(),
})

export const connectStoryToPostDtoSchema = z.object({
    post_id: z.number(),
    story_id: z.number(),
})

export const storySchema = z.object({
    id: z.number(),
    title: z.string().min(3).max(100),
    content: z.string().min(10).max(1000),
    user_id: z.number(),
    is_highlight: z.number().min(0).max(1),
    created_at: z.string(),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
export const storiesSchema = z.array(storySchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
export type CreateStoryDto = z.infer<typeof createStoryDtoSchema>
export type ConnectStoryToPostDto = z.infer<typeof connectStoryToPostDtoSchema>
export type Story = z.infer<typeof storySchema>
