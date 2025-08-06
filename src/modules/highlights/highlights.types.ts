import { z } from "zod"

// First, we define the zod schemas
export const createHighlightDtoSchema = z.object({
    story_id: z.string().url(),
})

export const highlightSchema = z.object({
    id: z.number(),
    img_url: z.string().url(),
    caption: z.string().nullable(),
    created_at: z.string(),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
export const highlightsSchema = z.array(highlightSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
export type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>
export type Post = z.infer<typeof highlightsSchema>
