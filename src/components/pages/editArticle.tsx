import FetchArticleById from '@/api/fetchArticleById'
import Loading from '@/components/ui/Loading'
import ArticleForm from '@/components/ui/articleForm'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditArticle() {
	const { id } = useParams()
	const { data, isSuccess, isFetching } = useQuery({
		queryKey: ['articles', id],
		queryFn: () => FetchArticleById(id ? parseInt(id) : -1),
	})
	const navigate = useNavigate()
	if (!isSuccess && !isFetching) {
		return <Loading />
	}
	if (!data)
		return (
			<div className="flex flex-col w-full items-center pt-8">
				<h1 className='className="font-bold text-4xl mb-4'>
					Article Not Found
				</h1>
				<button className="btn" onClick={() => navigate(-1)}>
					Return to previous page
				</button>
			</div>
		)
	return (
		<div>
      <p className='link' onClick={()=>navigate(-1)}>{'<'} Cancel edit</p>
			<h1 className="font-bold text-4xl mb-4">Editing {data?.title}</h1>
			<ArticleForm defaultValues={data} id={data?.id} />
		</div>
	)
}
