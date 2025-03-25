export interface IChannel {
	id: number
	title: string
}

export interface IChannelConfig {
	id: number
	swap_event_id: string
	title: string
	created_at: string
	updated_at: string
	top_banner: string
	background: string
	event_id: number
	items: IChannelAd[]
}

export interface IChannelAd {
	id: number
	channel_id: number
	type: string
	time: number
	media_url: string
	thumb: string
	order: number
	created_at: string
	updated_at: string
}
