import Sidebar from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function Root() {
	return (
		<>
			<Sidebar />
			<div id="detail">
				<Outlet />
			</div>
		</>
	)
}
