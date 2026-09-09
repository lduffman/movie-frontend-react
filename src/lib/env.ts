import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url({
    error: 'VITE_API_URL doit être une URL absolue, ex. http://localhost:8080',
  }),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  throw new Error(
    `Configuration invalide — vérifiez votre fichier .env\n${z.prettifyError(parsed.error)}`,
  )
}

export const env = parsed.data
