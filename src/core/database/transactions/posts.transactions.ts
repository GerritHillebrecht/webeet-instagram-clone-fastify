import { CreatePostDto } from "src/modules"

export function postTransactions(
    statements: Record<string, Record<string, (key?: unknown) => unknown>>
) {
    return {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: CreatePostDto) => {
            return statements.createPost.get(data)
        },
    }
}
