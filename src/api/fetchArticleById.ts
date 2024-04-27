import { Article } from '@/models/article'
import axios from 'axios'

export default async function FetchArticleById(id: number) {
	return axios
		.get(import.meta.env.VITE_API_URL + `/articles/${id}`)
		.then((res) => res.data as Article)
		.catch((error) => {
			throw error
		})
}
