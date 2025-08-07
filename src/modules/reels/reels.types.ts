import { z } from "zod"

export const createReelDtoSchema = z.object({
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

export const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable(),
    views: z.number(),
    created_at: z.string(),
})

export const reelsSchema = z.array(reelSchema)

export type CreateReelDto = z.infer<typeof createReelDtoSchema>
export type Reel = z.infer<typeof reelSchema>
