import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from './db'
import { house } from './db/schema'

const app = new Hono()
const factory = createFactory()

const getSchemaHandle = factory.createHandlers(async c => {
  const users = await db.select().from(house)

  return c.json({ msg: 'ok', data: users })
})

app.get('/api/schema', ...getSchemaHandle)

async function updateOrInsertUserData(userData: any) {
  const { id } = userData

  const existingHouse = await db
    .select()
    .from(house)
    .where(eq(house.id, id))
    .execute()

  if (existingHouse.length > 0) {
    // 存在则更新
    await db
      .update(house)
      .set(userData)
      .where(eq(house.id, id))
      .execute()
  } else {
    // 不存在则新建
    await db
      .insert(house)
      .values(userData)
      .execute()
  }
}

const userDataSchema = z.object({
  id: z.number(),
  author_id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  like_count: z.number(),
  collection_count: z.number(),
  house_info_id: z.number(),
  cover: z.string().url(),
  swiper: z.array(z.string().url())
})

const modifySchemaHandle = factory.createHandlers(async c => {
  const userData = await c.req.json()
  const { success, error } = userDataSchema.safeParse(userData)
  if (success) {
    return c.json({ msg: 'ok', data: null })
  }

  return c.json({ msg: error.message, data: null, code: 400 })
})

app.post('/api/schema_update', ...modifySchemaHandle)

app.onError((err, c) => {
  console.error(`${err}`)

  return c.json({ msg: err.message, data: null, code: 400 })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
