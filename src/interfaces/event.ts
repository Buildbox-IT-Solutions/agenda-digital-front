export interface IEvent {
	id: string
	title: string
	beginsAt: string
	banner: IEventBanner
}

export interface IEventBanner {
	imageUrl: string
}
