import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { EQueryKeys } from '~/enums/query-keys'
import type { IEventConfig } from '~/interfaces/event'
import { api } from './api'

export function useEventConfig(
	channelId: string,
): UseQueryResult<IEventConfig> {
	return useQuery({
		queryKey: [EQueryKeys.CONFIG, channelId],
		queryFn: async () => {
			const response = await api(
				`/event/get-channel-content/${channelId}`,
			)

			return response.data
		},
		enabled: !!channelId,
	})
}

export function useEventAgenda(
	channelId: string,
): UseQueryResult<IEventConfig> {
	const date = format(new Date(), 'yyyy-MM-dd')

	return useQuery({
		queryKey: [EQueryKeys.AGENDA, channelId, date],
		queryFn: async () => {
			const response = await api(
				`/event/get-agenda-content-by-date/${channelId}/${date}`,
			)

			return response.data
		},
		enabled: !!channelId,
	})
}
