import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { EQueryKeys } from '~/enums/query-keys'
import type { IEvent } from '~/interfaces/event'
import { api } from './api'

export function useEvents(): UseQueryResult<IEvent[]> {
	return useQuery({
		queryKey: [EQueryKeys.EVENTS],
		queryFn: async () => {
			const response = await api('/event/list')

			return response.data
		},
	})
}
