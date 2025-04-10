import { Link, useParams } from 'react-router'
import { Footer } from '~/components/footer'
import { Loading } from '~/components/loading'
import { useGetChannels } from '~/services/channels'

export function ChannelsScreen() {
	const { id } = useParams<{
		id: string
	}>()

	const { data: channels, isLoading, dataUpdatedAt } = useGetChannels(id)

	return (
		<div className="flex h-screen w-screen flex-col bg-cover bg-slate-800">
			<header className="flex h-20 items-center justify-center border-white border-b bg-green-400">
				<h1 className="text-2xl text-white uppercase">Canais</h1>
			</header>

			{isLoading ? (
				<main className="flex flex-1 items-center justify-center">
					<Loading />
				</main>
			) : (
				<main className="m-auto flex w-full flex-wrap justify-center gap-4 overflow-y-auto p-4">
					{channels?.map(({ title, id }) => (
						<Link
							key={id}
							className="flex h-fit w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-lg border border-white bg-white p-4"
							to={`/carrousel/${id}`}
						>
							<h2 className="text-center font-semibold text-2xl">
								{title}
							</h2>
						</Link>
					))}
				</main>
			)}

			<Footer dataUpdatedAt={dataUpdatedAt} />
		</div>
	)
}
