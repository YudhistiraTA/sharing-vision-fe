import { Article } from '@/models/article'
import axios from 'axios'

export type FetchArticlesOptions = {
	offset: number
	limit: number
	status: 'Publish' | 'Draft' | 'Trash'
}

export default async function fetchArticles({
	offset,
	limit,
	status,
}: FetchArticlesOptions) {
	return axios
		.get(
			import.meta.env.VITE_API_URL +
				`/articles/${limit}/${offset}?status=${status}`,
		)
		.then((res) => res.data as Article[])
}
