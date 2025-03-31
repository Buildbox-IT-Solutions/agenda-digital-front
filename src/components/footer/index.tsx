import { format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import logo from '~/assets/images/logo.svg'
import type { IFooterProps } from './types'

export function Footer({ dataUpdatedAt = 0 }: IFooterProps) {
	const [time, setTime] = useState(Date.now())

	function updateTime() {
		const intervalId = setInterval(() => {
			setTime(Date.now())
		}, 1000 * 30) // 30 seconds

		return () => {
			clearInterval(intervalId)
		}
	}
	useEffect(updateTime, [])

	return (
		<footer className="flex min-h-14 w-screen items-center justify-between bg-slate-900 px-3">
			<div className="flex items-center gap-4">
				<div className="flex size-5 animate-pulse items-center justify-center rounded-full border border-green-400">
					<div className="size-3 rounded-full bg-green-400" />
				</div>

				<span className="font-medium text-base text-white">
					{format(time, 'HH:mm')}
				</span>

				{dataUpdatedAt > 0 && (
					<p className="font-medium text-white text-xs">
						Última Sincronização:{' '}
						<strong>
							{formatDistance(dataUpdatedAt, time, {
								includeSeconds: true,
								locale: ptBR,
							})}
						</strong>
					</p>
				)}
			</div>

			<img src={logo} alt="" />
		</footer>
	)
}
