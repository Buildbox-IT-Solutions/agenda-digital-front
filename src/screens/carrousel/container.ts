import { addHours, isWithinInterval, parseISO } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { IEvent } from '~/interfaces/event'
import { useEvents } from '~/services/events'

const SCROLL_SPEED = 0.15

export function useCarrouselScreenContainer() {
	const [multiplier, setMultiplier] = useState(1)

	const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null)

	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const itemsContainerRef = useRef<HTMLDivElement>(null)

	const { data: events } = useEvents()

	const renderList = useMemo(() => {
		if (!events) return []

		const multipliedEvents: IEvent[] = []

		for (let i = 0; i < multiplier; i++) {
			for (const event of events) {
				multipliedEvents.push({
					...event,
					id: `${event.id}-${i}`,
				})
			}
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

	return {
		currentEvent,
		scrollContainerRef,
		itemsContainerRef,
		renderList,
		calcMultiplier,
		multiplier,
	}
}
