import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { EQueryKeys } from '~/enums/query-keys'
import type { IChannel } from '~/interfaces/channel'
import { api } from './api'

export function useGetChannels(eventId?: string): UseQueryResult<IChannel[]> {
	return useQuery({
		queryKey: [EQueryKeys.CHANNELS, eventId],
		queryFn: async () => {
			const response = await api(`/event/get-channels/${eventId}`)

			return response.data
		},
		enabled: !!eventId,
	})
}
