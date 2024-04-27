import useTitle from '@/hooks/useTitle'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
	const error = useRouteError() as { statusText: string; message: string }
	const navigate = useNavigate()
	useTitle(error.statusText || error.message)
	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<button className='btn' onClick={() => navigate(-1)}>Return to previous page</button>
		</div>
	)
}
