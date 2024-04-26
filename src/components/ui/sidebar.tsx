import { Link } from 'react-router-dom'

export default function Sidebar() {
	return (
		<div id="sidebar">
			<div>
				<h1>Sharing Vision Articles</h1>
			</div>
			<nav>
				<ul>
					<li>
						<Link to="/">All Posts</Link>
					</li>
					<li>
						<Link to="/new">Add New</Link>
					</li>
					<li>
						<Link to="/preview">Preview</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
