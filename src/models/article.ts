import { z } from 'zod'

type Status = 'Publish' | 'Draft' | 'Trash'
export type Article = {
	id: number
	title: string
	content: string
	category: string
	created_at: string
	updated_at: string
	status: Status
}

export const ArticleSchema = z.object({
	title: z.string().min(20, 'Title must be at least 20 characters'),
	content: z.string().min(200, 'Content must be at least 200 characters'),
	category: z.string().min(3, 'Category must be at least 3 characters'),
})