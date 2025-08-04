import { z } from "zod"

const createReelDtoSchema = z.object({
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable(),
    views: z.number(),
    created_at: z.string(), // SQLite returns DATETIME as a string by default
})

const reelsSchema = z.array(reelSchema)

type CreateReelDto = z.infer<typeof createReelDtoSchema>
type Reel = z.infer<typeof reelSchema>

export { CreateReelDto, createReelDtoSchema, Reel, reelSchema, reelsSchema }

