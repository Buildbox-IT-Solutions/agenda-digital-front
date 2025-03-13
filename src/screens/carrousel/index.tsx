import { addHours, isWithinInterval, parseISO } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import arrowDownRightIcon from '~/assets/icons/arrow-down-right.svg'
import backgroundImage from '~/assets/images/background.png'
import banner from '~/assets/images/header-banner.png'
import { Event } from '~/components/event'
import type { IEvent } from '~/interfaces/event'
import { useEvents } from '~/services/events'

const SCROLL_SPEED = 0.15

export function CarrouselScreen() {
	const [multiplier, setMultiplier] = useState(1)

	const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null)

	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const itemsContainerRef = useRef<HTMLDivElement>(null)

	const { data: events } = useEvents()

	const renderList = useMemo(() => {
		if (!events) return []

		const multipliedEvents: IEvent[] = []

		for (let i = 0; i < multiplier; i++) {
			multipliedEvents.push(...events)
		}

		return multipliedEvents
	}, [events, multiplier])

	function verifyCurrentEvent() {
		const now = new Date()

		for (const event of events || []) {
			const startDate = parseISO(event.beginsAt)

			const endDate = addHours(startDate, 1)

			const isCurrentEvent = isWithinInterval(now, {
				start: startDate,
				end: endDate,
			})

			if (isCurrentEvent) {
				setCurrentEvent(event)
				break
			}
		}
	}

	function currentEventObserver() {
		verifyCurrentEvent()

		const intervalId = setInterval(verifyCurrentEvent, 1000 * 30) // 30 seconds

		return () => {
			clearInterval(intervalId)
		}
	}
	useEffect(currentEventObserver, [events])

	function calcMultiplier() {
		if (!events) return

		const scrollContainer = scrollContainerRef.current
		const itemsContainer = itemsContainerRef.current

		if (scrollContainer && itemsContainer) {
			const containerHeight = scrollContainer.clientHeight
			const itemHeight = itemsContainer.children[0]?.clientHeight || 0

			if (itemHeight) {
				const minRequiredHeight = containerHeight * 2
				const currentTotalHeight = itemHeight * events.length
				const multiplier = Math.ceil(
					minRequiredHeight / currentTotalHeight,
				)

				const factor = Math.max(multiplier, 1)
				setMultiplier(factor)
			}
		}
	}
	useEffect(calcMultiplier, [events?.length])

	function handleAutoScroll() {
		const scrollContainer = scrollContainerRef.current
		if (!scrollContainer) return

		let animationFrameId: number
		let lastTimestamp = 0

		function animate(timestamp: number) {
			if (!scrollContainer) return

			if (!lastTimestamp) lastTimestamp = timestamp
			const deltaTime = timestamp - lastTimestamp

			scrollContainer.scrollTop += SCROLL_SPEED * deltaTime

			if (
				scrollContainer.scrollTop + scrollContainer.clientHeight >=
				scrollContainer.scrollHeight
			) {
				scrollContainer.scrollTop = 0
			}

			lastTimestamp = timestamp
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}
	useEffect(handleAutoScroll, [SCROLL_SPEED])

	return (
		<div
			className="flex h-screen w-screen items-center justify-center bg-center bg-contain "
			style={{
				backgroundImage: `url(${backgroundImage})`,
			}}
		>
			<main className="flex h-screen w-full max-w-5xl flex-col">
				<header className="shadow- bg-black/50 shadow-black backdrop-blur-md">
					<div className="p-12">
						<img src={banner} alt="banner" />
					</div>

					{currentEvent && (
						<div className="flex flex-col gap-8 border-white/25 border-t border-b p-12">
							<h2 className="font-semibold text-3xl text-white uppercase">
								• Acontecendo agora
							</h2>

							<Event event={currentEvent} />
						</div>
					)}

					<div className="flex items-center gap-2 px-12 py-8">
						<h2 className="font-semibold text-[2rem] text-white uppercase">
							Próximas palestras
						</h2>

						<img
							className="h-5 w-5"
							src={arrowDownRightIcon}
							alt="arrow down right"
						/>
					</div>
				</header>

				<div
					ref={scrollContainerRef}
					className="pointer-events-none relative flex flex-1 flex-col gap-6 overflow-y-hidden bg-cover bg-pink-600 bg-top p-12"
				>
					<div
						ref={itemsContainerRef}
						className="flex flex-col gap-6"
					>
						{renderList?.map((event) => (
							<Event key={event.id} event={event} />
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
