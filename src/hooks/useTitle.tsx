import { useRef, useEffect } from 'react'

export default function useTitle(title: string, prevailOnUnmount = false) {
	const defaultTitle = useRef(document.title)

	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				document.title = defaultTitle.current
			}
		},
		[prevailOnUnmount],
	)
}
