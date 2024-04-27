import { ArticleSchema } from '@/models/article'
import axios from 'axios'
import { z } from 'zod'

export default async function PostArticle({
	data,
	id = null,
}: {
	data: z.infer<typeof ArticleSchema> & { status: 'Publish' | 'Draft' }
	id?: number | null
}) {
	if (!id) return axios.post(import.meta.env.VITE_API_URL + '/articles', data)
	else return axios.put(import.meta.env.VITE_API_URL + `/articles/${id}`, data)
}
