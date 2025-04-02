import { isAfter, isWithinInterval, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import type { IAgenda } from '~/interfaces/agenda'
import type { IChannelAd } from '~/interfaces/channel'
import { useCarrouselAgenda, useCarrouselConfig } from '~/services/carrousel'
import { delay } from '~/utils/delay'

const INIT_BANNER_TIME = 1000 * 60 // 1 minute

export function useChannelScreenContainer() {
	const [currentEvent, setCurrentEvent] = useState<IAgenda | null>(null)

	const [currentBanner, setCurrentBanner] = useState<IChannelAd | null>(null)

	const [renderList, setRenderList] = useState<IAgenda[]>([])

	const [animationEnd, setAnimationEnd] = useState(0)

	const isBannerStarted = useRef(false)

	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const scrollContentRef = useRef<HTMLDivElement>(null)

	const { id } = useParams<{
		id: string
	}>()

	const { data: config } = useCarrouselConfig(id)

	const {
		data: agenda,
		dataUpdatedAt,
		isSuccess,
		isLoading,
	} = useCarrouselAgenda(id)

	const banners = config?.items.filter((item) => item.type === 'banner') || []

	const isEmptyAgenda = !agenda?.length

	const isEnded = !isEmptyAgenda && renderList.length === 0

	function updateRenderList() {
		if (!agenda?.length) return

		const availableEvents: IAgenda[] = []

		for (const event of agenda) {
			const isEnded = isAfter(new Date(), parseISO(event.beginsAt))

			if (isEnded) continue

			availableEvents.push(event)
		}

		setRenderList(availableEvents)
	}

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

	async function calcAnimationEnd() {
		await delay(100)

		const content = scrollContentRef.current
		const container = scrollContainerRef.current

		if (!content || !container) return

		const contentHeight = content.scrollHeight
		const containerHeight = container.clientHeight

		if (contentHeight <= containerHeight) {
			setAnimationEnd(0)
			return
		}

		const end = container.clientHeight - contentHeight - 48 * 2 // 48 is the padding top and bottom

		setAnimationEnd(end)
	}

	function startObservers() {
		verifyCurrentEvent()
		updateRenderList()
		calcAnimationEnd()

		const currentEventInterval = setInterval(verifyCurrentEvent, 1000 * 60) //1 minute

		const renderListInterval = setInterval(updateRenderList, 1000 * 60) //1 minute

		window.addEventListener('resize', calcAnimationEnd)
		window.addEventListener('orientationchange', calcAnimationEnd)

		return () => {
			clearInterval(currentEventInterval)
			clearInterval(renderListInterval)

			window.removeEventListener('resize', calcAnimationEnd)
			window.removeEventListener('orientationchange', calcAnimationEnd)
		}
	}
	useEffect(startObservers, [agenda, isSuccess])

	async function startBanner() {
		if (!banners.length || isBannerStarted.current) return

		isBannerStarted.current = true

		for await (const banner of banners) {
			await delay(INIT_BANNER_TIME)

			setCurrentBanner(banner)

			await delay(banner.time * 1000)

			setCurrentBanner(null)
		}

		isBannerStarted.current = false
		startBanner()
	}
	useEffect(() => {
		startBanner()
	}, [banners])

	return {
		currentEvent,
		scrollContainerRef,
		renderList,
		config,
		dataUpdatedAt,
		currentBanner,
		animationEnd,
		scrollContentRef,
		isEnded,
		isEmptyAgenda,
		isLoading,
	}
}
