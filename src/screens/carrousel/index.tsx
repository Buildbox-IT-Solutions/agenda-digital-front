import arrowDownRightIcon from '~/assets/icons/arrow-down-right.svg'
import backgroundImage from '~/assets/images/background.png'
import banner from '~/assets/images/header-banner.png'
import { Event } from '~/components/event'
import { useCarrouselScreenContainer } from './container'

const _SCROLL_SPEED = 0.15

export function CarrouselScreen() {
	const { currentEvent, itemsContainerRef, renderList, scrollContainerRef } =
		useCarrouselScreenContainer()

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
