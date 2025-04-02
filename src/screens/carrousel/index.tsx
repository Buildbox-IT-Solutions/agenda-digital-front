import clsx from 'clsx'
import { format } from 'date-fns'
import arrowDownRightIcon from '~/assets/icons/arrow-down-right.svg'
import { Agenda } from '~/components/agenda'
import { Banner } from '~/components/banner'
import { Footer } from '~/components/footer'
import { useChannelScreenContainer } from './container'

export function CarrouselScreen() {
	const {
		currentEvent,
		renderList,
		config,
		dataUpdatedAt,
		currentBanner,
		scrollContainerRef,
		scrollContentRef,
		animationEnd,
		isEmptyAgenda,
		isEnded,
		isLoading,
	} = useChannelScreenContainer()

	if (isLoading)
		return (
			<div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800">
				<div className="flex-1" />

				<Footer dataUpdatedAt={dataUpdatedAt} />
			</div>
		)

	function Content() {
		if (isEmptyAgenda) {
			return (
				<div className="flex flex-1 flex-col items-center justify-center gap-6">
					{config?.title && (
						<div className="flex h-12 items-center justify-center rounded-full bg-white px-5">
							<span className="font-semibold text-base text-black uppercase">
								{config.title}
							</span>
						</div>
					)}

					<p className="font-semibold text-5xl text-white">
						Não há eventos neste Canal
					</p>
				</div>
			)
		}

		if (isEnded) {
			return (
				<div className="flex flex-1 flex-col items-center justify-center">
					<div className="mb-14 flex flex-col items-center justify-center gap-2">
						<div className="flex h-32 items-center justify-center gap-6 rounded-full bg-white px-10">
							<span className="font-barlow font-normal text-[80px] text-black uppercase">
								{format(new Date(), 'dd/MM')}
							</span>

							<span className="text-4xl">✅</span>
						</div>

						{config?.title && (
							<div className="flex h-12 items-center justify-center rounded-full bg-white px-5">
								<span className="font-semibold text-base text-black uppercase">
									{config.title}
								</span>
							</div>
						)}
					</div>

					<p className="mb-6 font-semibold text-5xl text-white">
						Nos vemos na próxima!
					</p>

					<p className="max-w-[640px] text-center font-medium text-2xl text-white">
						Chegamos ao fim de mais um evento. Não há mais palestras
						para o dia de hoje.
					</p>
				</div>
			)
		}

		return (
			<div
				ref={scrollContainerRef}
				className="flex w-full flex-1 flex-col gap-6 overflow-y-hidden p-12"
			>
				<div
					ref={scrollContentRef}
					style={{
						animation: 'scroll 30s linear infinite',
					}}
					className={'flex flex-col gap-6'}
				>
					{renderList?.map((agenda) => (
						<Agenda key={agenda.title} agenda={agenda} />
					))}
				</div>
			</div>
		)
	}

	return (
		<div
			className={clsx(
				'flex h-screen w-screen flex-col items-center justify-center',
				{
					'bg-center bg-contain': !!config?.background,
					'bg-cover bg-slate-800': !config?.background,
				},
			)}
			style={
				config?.background
					? {
							backgroundImage: `url(${config?.background})`,
						}
					: undefined
			}
		>
			<main className="relative flex h-screen w-full flex-col overflow-hidden">
				<Banner banner={currentBanner} headerImg={config?.top_banner} />

				<div className="relative">
					{config?.top_banner && (
						<img
							className="absolute top-0 left-0 h-full w-full object-cover"
							src={config.top_banner}
							alt=""
						/>
					)}

					<header className="backdrop-blur-3xl">
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
								<h2 className="font-barlow font-semibold text-3xl text-white uppercase">
									• Acontecendo agora
								</h2>

								<Agenda agenda={currentEvent} />
							</div>
						)}

						{!!renderList.length && (
							<div className="flex items-center gap-2 px-12 py-8">
								<h2 className="font-barlow font-semibold text-[2rem] text-white uppercase">
									Próximas palestras
								</h2>

								<img
									className="h-5 w-5"
									src={arrowDownRightIcon}
									alt="arrow down right"
								/>
							</div>
						)}
					</header>
				</div>

				<Content />
			</main>

			<Footer dataUpdatedAt={dataUpdatedAt} />

			<style>
				{`
				@keyframes scroll {
					0% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(${animationEnd}px);
					}
					100% {
						transform: translateY(0px);
					}
				}
				`}
			</style>
		</div>
	)
}
