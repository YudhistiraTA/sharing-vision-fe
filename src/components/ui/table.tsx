import deleteArticle from '@/api/deleteArticle'
import EditIcon from '@/components/icons/editIcon'
import TrashIcon from '@/components/icons/trashIcon'
import { Article } from '@/models/article'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function Actions({ id }: { id: number }) {
	const queryClient = useQueryClient()
	const deleteMutation = useMutation({
		mutationFn: deleteArticle,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
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
		return (
			<div className="flex w-full justify-center pt-8">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		)
	}
	if (!data?.length) {
		return (
			<div className="flex w-full justify-center pt-8">
				<h2 className="text-3xl font-semibold text-slate-500">No data</h2>
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
				</tbody>
			</table>
		</div>
	)
}
