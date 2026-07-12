import {db} from "./index.js";
import {feeds, users} from "./schema.js";
import {eq} from "drizzle-orm";

export type Feed = typeof feeds.$inferSelect;

export async function createFeed(name:string, url:string, user_id:string){
    const [result] = await db.insert(feeds).values({
        name:name,
        url:url,
        user_id:user_id
    }).returning();
    return result;
}

export async function getAllFeeds(){
    return db.select().from(feeds);
}
export async function getFeedsAndUserName(){
    return db.select({Username:users.name, Name:feeds.name, ID:feeds.id, URL:feeds.url}).from(feeds).innerJoin(users, eq(users.id, feeds.user_id));

}

