import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { EQueryKeys } from '~/enums/query-keys'
import type { IAgenda } from '~/interfaces/agenda'
import type { IChannelConfig } from '~/interfaces/channel'
import { api } from './api'

export function useCarrouselConfig(
	channelId?: string,
): UseQueryResult<IChannelConfig> {
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

export function useCarrouselAgenda(
	channelId?: string,
	mockDate?: string | null,
): UseQueryResult<IAgenda[]> {
	const date = mockDate
		? mockDate.replaceAll('/', '-')
		: format(new Date(), 'yyyy-MM-dd')

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
