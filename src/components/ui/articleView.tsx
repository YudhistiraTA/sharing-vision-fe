import { Article } from '@/models/article'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function ArticleView({ article }: { article: Article }) {
	return (
		<div className="border-b pb-4">
			<Link to={`/edit/${article.id}`} className="font-bold text-3xl">
				{article.title}
			</Link>
			<div className="flex justify-between mb-2 text-sm opacity-50">
				<div className="flex flex-col">
					<p>{dayjs(article.created_at).format('DD MMMM YYYY')}</p>
					{article.created_at !== article.updated_at && (
						<p>
							Last updated {dayjs(article.updated_at).format('DD MMMM YYYY')}
						</p>
					)}
				</div>
				<p>Category: {article.category}</p>
			</div>
			<p>{article.content}</p>
		</div>
	)
}
