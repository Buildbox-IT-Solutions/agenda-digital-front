import clsx from 'clsx'
import arrowDownRightIcon from '~/assets/icons/arrow-down-right.svg'
import backgroundAsset from '~/assets/images/background-asset.svg'
import { Agenda } from '~/components/agenda'
import { Banner } from '~/components/banner'
import { Footer } from '~/components/footer'
import { useChannelScreenContainer } from './container'

export function CarrouselScreen() {
	const {
		currentEvent,
		itemsContainerRef,
		renderList,
		scrollContainerRef,
		config,
		dataUpdatedAt,
		currentBanner,
	} = useChannelScreenContainer()

	return (
		<div
			className={clsx(
				'flex h-screen w-screen flex-col items-center justify-center',
				{
					'bg-center bg-contain': !!config?.background,
					'bg-cover bg-pink-600': !config?.background,
				},
			)}
			style={
				config?.background
					? {
							backgroundImage: `url(${config?.background})`,
						}
					: {
							backgroundImage: `url(${backgroundAsset})`,
						}
			}
		>
			<main className="relative flex h-screen w-full max-w-5xl flex-col">
				<Banner banner={currentBanner} headerImg={config?.top_banner} />

				<header className="shadow- bg-black/50 shadow-black backdrop-blur-3xl">
					{config?.top_banner && (
						<div className="p-12">
							<img
								className="h-32 w-full rounded-lg object-cover"
								src={config?.top_banner}
								alt="banner"
							/>
						</div>
					)}

					{currentEvent && (
						<div className="flex flex-col gap-8 border-white/25 border-t border-b p-12">
							<h2 className="font-semibold text-3xl text-white uppercase">
								• Acontecendo agora
							</h2>

							<Agenda agenda={currentEvent} />
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
					className="pointer-events-none relative flex flex-1 flex-col gap-6 overflow-y-hidden bg-cover bg-top p-12"
				>
					<div
						ref={itemsContainerRef}
						className="flex flex-col gap-6"
					>
						{renderList?.map((agenda) => (
							<Agenda key={agenda.id} agenda={agenda} />
						))}
					</div>
				</div>
			</main>

			<Footer dataUpdatedAt={dataUpdatedAt} />
		</div>
	)
}
