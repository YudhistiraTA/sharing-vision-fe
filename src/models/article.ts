type Status = 'Publish' | 'Draft' | 'Trash'
export type Article = {
	id: number
	title: string
	content: string
	category: string
	created_at: string
	updated_at: string
	status: Status
}
