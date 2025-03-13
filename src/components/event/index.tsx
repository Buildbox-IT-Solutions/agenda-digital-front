import { format, parseISO } from 'date-fns'
import type { IEventProps } from './types'

export function Event({ event }: IEventProps) {
	const hours = format(parseISO(event.beginsAt), 'HH:mm')

	return (
		<div className="flex flex-col gap-8 rounded-2xl bg-white p-8">
			<div className="flex gap-8">
				<span className="font-normal text-7xl">{hours}</span>

				<div className="flex flex-1 flex-col gap-3">
					<p className="font-medium text-[2rem]">{event.title}</p>

					{/* DESCRIPTION ?  */}
					{/* <p className="font-normal text-base">{event.title}</p> */}
				</div>

				<img
					className="h-32 w-40 rounded-lg object-cover"
					src={event.banner.imageUrl}
					alt=""
				/>
			</div>

			{/* SPEAKERS? */}
			{/* <div className="flex items-center gap-7">
				<div className="flex items-center gap-2">
					<img className="h-6 w-6" src={megaphoneIcon} alt="" />

					<span className="font-medium text-xl uppercase">
						palestrantes
					</span>
				</div>

				{Array.from({ length: 2 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: temporary
					<div className="flex items-center gap-2" key={index}>
						<img
							className="h-9 w-9 rounded-full object-cover"
							src="https://github.com/leonardowlopes.png"
							alt="leonardowlopes"
						/>

						<span className="font-medium text-xl">
							Leonardo Lopes
						</span>
					</div>
				))}
			</div> */}
		</div>
	)
}
