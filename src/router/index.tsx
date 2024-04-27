import { createBrowserRouter } from 'react-router-dom'
import Root from '@/components/layouts/root'
import ErrorPage from '@/components/pages/errorPage'
import AllArticles from '@/components/pages/allArticles'
import NewArticle from '@/components/pages/newArticle'
import EditArticle from '@/components/pages/editArticle'
import PreviewPage from '@/components/pages/previewPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ path: '', element: <AllArticles /> },
			{ path: '/new', element: <NewArticle /> },
			{ path: '/preview', element: <PreviewPage />},
			{ path: '/edit/:id', element: <EditArticle /> },
		],
	},
])
export default router
