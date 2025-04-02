import { format, parseISO } from 'date-fns'
import megaphoneIcon from '~/assets/icons/megaphone.svg'
import type { IAgendaProps } from './types'

export function Agenda({ agenda }: IAgendaProps) {
	const hour = format(parseISO(agenda.beginsAt), 'HH:mm')

	return (
		<div className="flex flex-col gap-8 rounded-2xl bg-white p-8">
			<div className="flex gap-8">
				<span className="font-barlow font-normal text-7xl">{hour}</span>

				<div className="flex flex-1 flex-col gap-3">
					<p className="font-medium text-[2rem]">{agenda.title}</p>

					<p className="font-normal text-base">
						{agenda.description}
					</p>
				</div>

				{/* <img
					className="h-32 w-40 rounded-lg object-cover"
					src={'agenda.thumb'}
					alt=""
				/> */}
			</div>

			{!!agenda.speakers.length && (
				<div className="flex items-center gap-7">
					<div className="flex items-center gap-2">
						<img className="h-6 w-6" src={megaphoneIcon} alt="" />

						<span className="font-barlow font-medium text-xl uppercase">
							palestrantes
						</span>
					</div>

					<div className="grid grid-cols-3">
						{agenda.speakers.map(
							({ firstName, lastName, photoUrl }) => {
								const fullName = [firstName, lastName]
									.filter(Boolean)
									.join(' ')

								return (
									<div
										className="flex items-center gap-2"
										key={fullName}
									>
										<img
											className="h-9 w-9 rounded-full object-cover"
											src={photoUrl}
											alt={fullName}
										/>

										<span className="font-medium text-xl">
											{fullName}
										</span>
									</div>
								)
							},
						)}
					</div>
				</div>
			)}
		</div>
	)
}
