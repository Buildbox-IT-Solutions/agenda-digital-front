import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchInterval: 1000 * 60, // 1 minute
		},
	},
})

export function QueryProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
