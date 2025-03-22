import { Link } from 'react-router'
import backgroundAsset from '~/assets/images/background-asset.svg'
import { Loading } from '~/components/loading'
import { useGetEvents } from '~/services/events'

export function EventsScreen() {
	const { data: events, isLoading } = useGetEvents()

	return (
		<div
			className="flex h-screen w-screen flex-col bg-cover bg-pink-600"
			style={{
				backgroundImage: `url(${backgroundAsset})`,
			}}
		>
			<header className="flex h-20 items-center justify-center border-white border-b bg-blue-900">
				<h1 className="text-2xl text-white uppercase">Eventos</h1>
			</header>

			{isLoading ? (
				<main className="flex flex-1 items-center justify-center">
					<Loading />
				</main>
			) : (
				<main className="flex flex-1 flex-wrap justify-center gap-4 overflow-y-auto p-4 align-center">
					{events?.map(({ title, id, imageUrl }) => (
						<Link
							key={id}
							className="flex max-w-80 flex-col overflow-hidden rounded-lg border border-white bg-white"
							to={`/channels/${id}`}
						>
							<img className="" src={imageUrl} alt={title} />

							<div className="flex flex-1 flex-col gap-4 p-4">
								<h2 className="mb-auto text-center font-semibold text-2xl">
									{title}
								</h2>

								<button
									className="rounded-lg bg-blue-900 p-2 text-white"
									type="button"
								>
									Acessar
								</button>
							</div>
						</Link>
					))}
				</main>
			)}
		</div>
	)
}
