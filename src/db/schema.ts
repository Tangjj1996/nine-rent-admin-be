import * as t from 'drizzle-orm/mysql-core'

export const house = t.mysqlTable('house', {
  id: t.int('id').autoincrement().primaryKey(),
  author_id: t.int('author_id').notNull().$default(() => 0),
  title: t.varchar('title').notNull(),
  content: t.text('content').notNull(),
  tags: t.text('tags').notNull(),
  like_count: t.int('like_count').notNull().$default(() => 0),
  collection_count: t.int('collection_count').notNull().$default(() => 0),
  house_info_id: t.int('house_info_id'),
  conver: t.text('cover').notNull(),
  swiper: t.text('swiper').notNull()
})

export const houseInfo = t.mysqlTable('house_info', {
  
})