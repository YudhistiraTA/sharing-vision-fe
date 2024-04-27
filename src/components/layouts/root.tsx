import MenuIcon from '@/components/icons/menuIcon'
import Sidebar from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function Root() {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				<div
					id="mobile-navbar"
					className="sticky top-0 w-full border-b-2 bg-white p-2 lg:hidden z-10"
				>
					<label
						htmlFor="my-drawer-2"
						className="drawer-button hover:cursor-pointer"
					>
						<MenuIcon />
					</label>
				</div>
				<div className="w-full h-full p-8">
					<Outlet />
				</div>
			</div>
			<div className="drawer-side z-20">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<Sidebar />
			</div>
		</div>
	)
}
