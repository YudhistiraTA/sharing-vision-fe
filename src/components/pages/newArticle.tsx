import ArticleForm from "@/components/ui/articleForm";
import useTitle from "@/hooks/useTitle";

export default function NewArticle() {
	useTitle('New Article')
	return (
		<div>
			<h1 className="font-bold text-4xl mb-4">New Article</h1>
      <ArticleForm />
		</div>
	)
}
