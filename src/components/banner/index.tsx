import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import type { IBannerProps } from './types'

export function Banner({ banner, headerImg }: IBannerProps) {
	const [remainingSeconds, setRemainingSeconds] = useState(0)

	const formattedTime =
		remainingSeconds > 0
			? `${Math.floor(remainingSeconds / 60)}:${(remainingSeconds % 60).toString().padStart(2, '0')}`
			: ''

	function updateTime() {
		if (banner?.time) {
			setRemainingSeconds(banner.time)
		} else {
			setRemainingSeconds(0)
		}
	}
	useEffect(updateTime, [banner])

	const startCountdown = useCallback(() => {
		if (!banner) return undefined

		const countdownInterval = setInterval(() => {
			setRemainingSeconds((prev) => {
				if (prev <= 1) {
					clearInterval(countdownInterval)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(countdownInterval)
	}, [banner])
	useEffect(() => {
		if (banner) return startCountdown()
	}, [banner, startCountdown])

	return (
		<div
			className={clsx(
				'absolute top-0 left-0 z-10 flex h-full w-full flex-col overflow-hidden p-12 opacity-0 shadow-black backdrop-blur-3xl transition-all duration-700',
				{
					'opacity-100': !!banner,
				},
			)}
		>
			{headerImg && (
				<div className="mb-12 w-full ">
					<img
						className="h-32 w-full rounded-lg object-cover"
						src={headerImg}
						alt="banner"
					/>
				</div>
			)}

			<div className="mx-auto mb-6 flex h-9 items-center justify-center rounded-full bg-black px-4">
				<span className="font-medium text-white text-xl uppercase">
					Anúncio {formattedTime && `(${formattedTime})`}
				</span>
			</div>

			<img
				className="h-full max-h-[1920px] rounded-lg object-cover"
				src={banner?.media_url}
				alt=""
			/>
		</div>
	)
}
