import axios from 'axios'
import { env } from '~/utils/env'

export const api = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${env.VITE_API_TOKEN}`,
	},
	baseURL: env.VITE_API_BASE_URL,
})
