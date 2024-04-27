import { Link, useLocation } from 'react-router-dom'

function isActive(tab: string, activeTab: string, root = false) {
	if (root) {
		return tab === activeTab ? 'active' : ''
	}
	return activeTab.includes(tab) ? 'active' : ''
}

export default function Sidebar() {
	const { pathname } = useLocation()
	return (
		<div id="sidebar" className='h-full'>
			<div>
				<h1>Sharing Vision Articles</h1>
			</div>
			<nav>
				<ul>
					<li>
						<Link to="/" className={isActive('/', pathname, true)}>
							All Posts
						</Link>
					</li>
					<li>
						<Link to="/new" className={isActive('/new', pathname)}>
							Add New
						</Link>
					</li>
					<li>
						<Link to="/preview" className={isActive('/preview', pathname)}>
							Preview
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
