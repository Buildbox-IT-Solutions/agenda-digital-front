import { BrowserRouter, Route, Routes } from 'react-router'
import { CarrouselScreen } from './screens/carrousel'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<CarrouselScreen />} />
			</Routes>
		</BrowserRouter>
	)
}
