import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { ChannelsScreen } from './screens/channels'
import { EventsScreen } from './screens/events'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<EventsScreen />} />

				<Route path="/channels/:id" element={<ChannelsScreen />} />

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	)
}
