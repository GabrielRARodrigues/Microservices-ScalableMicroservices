import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BROKER_URL: z.string().url(),
  OTEL_TRACES_EXPORTER: z.string(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url(),
  OTEL_SERVICE_NAME: z.string(),
  OTEL_NODE_ENABLED_INSTRUMENTATIONS: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
