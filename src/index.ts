import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { db } from './db'

const app = new Hono()
const factory = createFactory()

const handlers = factory.createHandlers(c => {
  return c.json({ name: 'gujianjie' })
})

app.get('/api/schema', ...handlers)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
