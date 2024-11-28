import * as t from 'drizzle-orm/mysql-core'

export const houseInfo = t.mysqlTable('house_info', {
  id: t.int().autoincrement().notNull(),
  code: t.varchar({ length: 256 }).notNull(),
  address: t.varchar({ length: 256 }).notNull()
})

export const house = t.mysqlTable('house', {
  id: t.int().autoincrement().primaryKey(),
  author_id: t.int().notNull().$default(() => 0),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  tags: t.text().notNull(),
  like_count: t.int().notNull().$default(() => 0),
  collection_count: t.int().notNull().$default(() => 0),
  house_info_id: t.int().references(() => houseInfo.id),
  cover: t.text().notNull(),
  swiper: t.text().notNull()
})