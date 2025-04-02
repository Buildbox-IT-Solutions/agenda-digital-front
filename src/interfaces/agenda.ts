export interface IAgenda {
	title: string
	beginsAt: string
	endsAt: string
	format: string
	place: string
	description: string
	speakers: IAgendaSpeaker[]
	date: string
}

export interface IAgendaSpeaker {
	firstName: string
	photoUrl: string
	lastName: string
}
