import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { CarrouselScreen } from './screens/carrousel'
import { ChannelsScreen } from './screens/channels'
import { EventsScreen } from './screens/events'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<EventsScreen />} />

				<Route path="/channels/:id" element={<ChannelsScreen />} />

				<Route path="/carrousel/:id" element={<CarrouselScreen />} />

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	)
}
