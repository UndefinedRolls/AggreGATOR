import {db} from "./index.js";
import {feed_follows, feeds, users} from "./schema.js";
import {eq, sql} from "drizzle-orm";
import {timestamp} from "drizzle-orm/pg-core";

export type Feed = typeof feeds.$inferSelect;

export async function createFeed(name:string, url:string, user_id:string){
    const [result] = await db.insert(feeds).values({
        name:name,
        url:url,
        user_id:user_id
    }).returning();
    return result;
}

export async function getAllFeeds():Promise<Feed[]>{
    return db.execute(sql`SELECT * FROM ${feeds} ORDER BY ${feeds.last_fetched_at} ASC NULLS FIRST `);

}
export async function getFeedsAndUserName(){
//    return db.select({Username:users.name, Name:feeds.name, ID:feeds.id, URL:feeds.url}).from(feeds).innerJoin(users, eq(users.id, feeds.user_id));
    return db.select({feed:feeds, user:users}).from(feeds).innerJoin(users, eq(users.id, feeds.user_id));

}
export async function getFeedsByURL(url:string){
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
   return result;

}

export async function getFeedByID(id:string){
    const [result] = await db.select().from(feeds).where(eq(feeds.id, id));
    return result;
}

export function markFeedFetched(id:string){
    return db.update(feeds).set({last_fetched_at:new Date(), updatedAt:new Date()}).where(eq(feeds.id, id)).returning();
}