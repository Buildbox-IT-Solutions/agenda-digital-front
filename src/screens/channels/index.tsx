import { Link, useParams } from 'react-router'
import backgroundAsset from '~/assets/images/background-asset.svg'
import { Loading } from '~/components/loading'
import { useGetChannels } from '~/services/channels'

export function ChannelsScreen() {
	const { id } = useParams<{
		id: string
	}>()

	const { data: channels, isLoading } = useGetChannels(id)

	return (
		<div
			className="flex h-screen w-screen flex-col bg-cover bg-pink-600"
			style={{
				backgroundImage: `url(${backgroundAsset})`,
			}}
		>
			<header className="flex h-20 items-center justify-center border-white border-b bg-blue-900">
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
		</div>
	)
}
