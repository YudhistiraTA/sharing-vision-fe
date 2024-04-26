import fetchArticles, { FetchArticlesOptions } from '@/api/fetchArticles'
import Table from '@/components/ui/table'
import useTitle from '@/hooks/useTitle'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function isActive(tab: string, activeTab: string) {
	return tab === activeTab ? 'tab tab-active' : 'tab'
}

export default function AllArticles() {
	useTitle('All Posts')
	const [queryOptions, setQueryOptions] = useState<FetchArticlesOptions>({
		offset: 0,
		limit: 10,
		status: 'Publish',
	})
	const [searchParams, setSearchParams] = useSearchParams()
	const activeTab =
		(searchParams.get('tab') as 'Publish' | 'Draft' | 'Trash') || 'Publish'
	useEffect(() => {
		setQueryOptions((prev) => ({ ...prev, status: activeTab }))
	}, [activeTab])
	function changeTab(tab: 'Publish' | 'Draft' | 'Trash') {
		setSearchParams({ tab })
	}
	const { data, isSuccess } = useQuery({
		queryKey: ['articles', queryOptions.status],
		queryFn: () => fetchArticles(queryOptions),
	})
	return (
		<div>
			<h1 className="font-bold text-4xl">All Articles</h1>
			<div role="tablist" className="tabs tabs-bordered">
				<div
					role="tab"
					className={isActive('Publish', activeTab)}
					onClick={() => changeTab('Publish')}
				>
					Publish
				</div>
				<div
					role="tab"
					className={isActive('Draft', activeTab)}
					onClick={() => changeTab('Draft')}
				>
					Draft
				</div>
				<div
					role="tab"
					className={isActive('Trash', activeTab)}
					onClick={() => changeTab('Trash')}
				>
					Trash
				</div>
			</div>
			<Table isSuccess={isSuccess} data={data || []} />
		</div>
	)
}
