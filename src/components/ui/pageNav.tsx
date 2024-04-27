import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PageNav({ currentLength }: { currentLength: number }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = useMemo(() => +(searchParams.get('page') || 1), [searchParams])
	function changePage(direction: 'next' | 'prev') {
		const next = direction === 'next'
		setSearchParams({
			...Object.fromEntries(searchParams),
			page: next ? String(page + 1) : String(page - 1 > 0 ? page - 1 : 1),
		})
	}
	if (page <= 1 && currentLength < 10) return null
	return (
		<div className="join grid grid-cols-2">
			<button
				disabled={page <= 1}
				className="join-item btn btn-outline"
				onClick={() => changePage('prev')}
			>
				Previous
			</button>
			<button
				disabled={currentLength < 10}
				className="join-item btn btn-outline"
				onClick={() => changePage('next')}
			>
				Next
			</button>
		</div>
	)
}
