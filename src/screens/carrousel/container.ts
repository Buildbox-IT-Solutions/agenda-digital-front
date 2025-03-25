import { isWithinInterval, parseISO } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import type { IAgenda } from '~/interfaces/agenda'
import { useCarrouselAgenda, useCarrouselConfig } from '~/services/carrousel'

const SCROLL_SPEED = 0.1

export function useChannelScreenContainer() {
	const [multiplier, setMultiplier] = useState(1)

	const [currentEvent, setCurrentEvent] = useState<IAgenda | null>(null)

	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const itemsContainerRef = useRef<HTMLDivElement>(null)

	const { id } = useParams<{
		id: string
	}>()

	const { data: config } = useCarrouselConfig(id)

	const { data: agenda } = useCarrouselAgenda(id)

	const renderList = useMemo(() => {
		if (!agenda) return []

		const multipliedEvents: IAgenda[] = []

		for (let i = 0; i < multiplier; i++) {
			for (const event of agenda) {
				multipliedEvents.push({
					...event,
					id: `${event.title}-${i}`,
				})
			}
		}

		return multipliedEvents
	}, [agenda, multiplier])

	function verifyCurrentEvent() {
		const now = new Date()

		for (const event of agenda || []) {
			const startDate = parseISO(event.beginsAt)

			const endDate = parseISO(event.endsAt)

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

		const intervalId = setInterval(verifyCurrentEvent, 1000 * 30) //30 seconds

		return () => {
			clearInterval(intervalId)
		}
	}
	useEffect(currentEventObserver, [agenda])

	function calcMultiplier() {
		if (!agenda) return

		const scrollContainer = scrollContainerRef.current
		const itemsContainer = itemsContainerRef.current

		if (scrollContainer && itemsContainer) {
			const containerHeight = scrollContainer.clientHeight
			const itemHeight = itemsContainer.children[0]?.clientHeight || 0

			if (itemHeight) {
				const minRequiredHeight = containerHeight * 2
				const currentTotalHeight = itemHeight * agenda.length
				const multiplier = Math.ceil(
					minRequiredHeight / currentTotalHeight,
				)

				const factor = Math.max(multiplier, 1)
				setMultiplier(factor)
			}
		}
	}
	useEffect(calcMultiplier, [agenda?.length])

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
		config,
	}
}
