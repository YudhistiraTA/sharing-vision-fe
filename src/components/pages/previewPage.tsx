import fetchArticles, { FetchArticlesOptions } from '@/api/fetchArticles'
import Loading from '@/components/ui/Loading'
import ArticleView from '@/components/ui/articleView'
import PageNav from '@/components/ui/pageNav'
import useTitle from '@/hooks/useTitle'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PreviewPage() {
	useTitle('Preview Articles')
	const [queryOptions, setQueryOptions] = useState<FetchArticlesOptions>({
		offset: 0,
		limit: 10,
		status: 'Publish',
	})
	const [searchParams] = useSearchParams()
	const page = useMemo(() => +(searchParams.get('page') || 1), [searchParams])
	useEffect(() => {
		setQueryOptions((prev) => ({ ...prev, offset: (page - 1) * 10 }))
	}, [page])
	const { data, isSuccess } = useQuery({
		queryKey: ['articles', queryOptions.status, queryOptions.offset],
		queryFn: () => fetchArticles(queryOptions),
	})
	if (!isSuccess) {
		return <Loading />
	}
	if (!data || !data.length) {
		return (
			<div className="flex flex-col items-center w-full justify-center pt-8 gap-4">
				<h2 className="text-3xl font-semibold text-slate-500">No data</h2>
				<PageNav currentLength={0} />
			</div>
		)
	}
	return (
		<div className="flex flex-col gap-4">
			{data.map((article) => (
				<ArticleView article={article} />
			))}
			<PageNav currentLength={data.length} />
		</div>
	)
}
