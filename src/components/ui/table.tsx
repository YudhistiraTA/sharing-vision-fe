import deleteArticle from '@/api/deleteArticle'
import EditIcon from '@/components/icons/editIcon'
import TrashIcon from '@/components/icons/trashIcon'
import Loading from '@/components/ui/Loading'
import PageNav from '@/components/ui/pageNav'
import { Article } from '@/models/article'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'

function Actions({ id }: { id: number }) {
	const queryClient = useQueryClient()
	const [searchParams, setSearchParams] = useSearchParams()
	const page = +(searchParams.get('page') || 1)
	const deleteMutation = useMutation({
		mutationFn: deleteArticle,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['articles'] })
			if (page > 1) {
				setSearchParams({
					...Object.fromEntries(searchParams),
					page: String(page - 1),
				})
			}
		},
	})
	return (
		<div className="flex gap-2">
			<Link to={`/edit/${id}`}>
				<div className="text-yellow-600 hover:cursor-pointer">
					<EditIcon />
				</div>
			</Link>
			<div
				className="text-red-600 hover:cursor-pointer"
				onClick={() => deleteMutation.mutate(id)}
			>
				<TrashIcon />
			</div>
		</div>
	)
}

export default function Table({
	isSuccess,
	data,
}: {
	isSuccess: boolean
	data: Article[]
}) {
	if (!isSuccess) {
		return <Loading />
	}
	if (!data?.length) {
		return (
			<div className="flex w-full justify-center pt-8 flex-col items-center gap-4">
				<h2 className="text-3xl font-semibold text-slate-500">No data</h2>
				<PageNav currentLength={0} />
			</div>
		)
	}
	return (
		<div className="overflow-x-auto pt-4">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th>Title</th>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((article) => (
						<tr key={article.id} className="hover">
							<td>{article.title}</td>
							<td>{article.category}</td>
							<td>
								<Actions id={article.id} />
							</td>
						</tr>
					))}
					<tr>
						<td colSpan={2}>
							<PageNav currentLength={data.length} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
