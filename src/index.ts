import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { eq } from 'drizzle-orm'
import { db } from './db'
import { userTable } from './db/schema'

const app = new Hono()
const factory = createFactory()

const handlers = factory.createHandlers(async c => {
  const users = await db.select().from(userTable)

  return c.json({ msg: 'ok', data: users })
})

app.get('/api/schema', ...handlers)

app.onError((err, c) => {
  console.error(`${err}`)

  return c.text('this is error', 500)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
