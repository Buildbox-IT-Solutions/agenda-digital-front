import { z } from 'zod'

const envSchema = z.object({
	VITE_API_BASE_URL: z.string().url(),
	VITE_API_TOKEN: z.string().optional(),
	DEV: z.boolean(),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
	// biome-ignore lint/suspicious/noConsole: handle env errors
	console.table(
		_env.error.errors.map(({ path, message }) => ({
			path: path[0],
			message,
		})),
	)

	throw new Error('Invalid env')
}

export const env = _env.data
