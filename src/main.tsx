import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryProvider } from './providers/query-provider.tsx'
import { Router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<Router />
		</QueryProvider>
	</StrictMode>,
)
