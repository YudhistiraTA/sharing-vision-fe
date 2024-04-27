import PostArticle from '@/api/postArticle'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArticleSchema } from '@/models/article'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export default function ArticleForm({
	defaultValues = { category: '', title: '', content: '' },
	id = null,
}: {
	defaultValues?: z.infer<typeof ArticleSchema>
	id?: number | null
}) {
	const form = useForm<z.infer<typeof ArticleSchema>>({
		resolver: zodResolver(ArticleSchema),
		defaultValues,
	})
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const articleMutation = useMutation({
		mutationFn: PostArticle,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
	})
	function onSubmit(
		data: z.infer<typeof ArticleSchema> & { status: 'Publish' | 'Draft' },
	) {
		articleMutation.mutate(
			{ data, id },
			{
				onSuccess: () => navigate(`/?tab=${data.status}`),
			},
		)
	}
	function buttonClick(type: 'Publish' | 'Draft') {
		form.handleSubmit((data) => {
			onSubmit({ ...data, status: type })
		})()
	}
	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Content"
									className="textarea textarea-bordered"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Input placeholder="Category" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<button
					type="button"
					className="btn"
					onClick={() => buttonClick('Publish')}
				>
					Publish
				</button>
				<button
					type="button"
					className="btn btn-accent ml-4"
					onClick={() => buttonClick('Draft')}
				>
					Draft
				</button>
			</form>
		</Form>
	)
}
