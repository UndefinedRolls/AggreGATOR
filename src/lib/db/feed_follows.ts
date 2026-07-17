import {db} from "./index.js";
import {feed_follows} from "./schema.js";
import {feeds} from "./schema.js";
import {users} from "./schema.js";
import {eq, and} from "drizzle-orm"

export type FeedFollow = typeof feed_follows.$inferSelect;

export async function createFeedFollows(feed_id:string, user_id:string){
    const [result] = await db.insert(feed_follows).values({
        user_id:user_id,
        feed_id:feed_id
    }).returning();
    return returnFollowFeedsByID(result.id);

}

async function returnFollowFeedsByID(joint_id:string){
    const [result] = await db.select({feed:feeds, user:users, follows:feed_follows})
        .from(feed_follows).innerJoin(feeds, eq(feeds.id, feed_follows.feed_id)).innerJoin(users, eq(users.id, feed_follows.user_id))
            .where(eq(feed_follows.id, joint_id));
    return result;
}


export async function getFeedFollowsForUser(user_id:string){
    return db.select({feed:feeds, user:users})
        .from(feed_follows)
        .innerJoin(feeds, eq(feeds.user_id, user_id))
        .innerJoin(users, eq(users.id, user_id))
        .where(eq(feed_follows.user_id, user_id));

}
export async function getFeedFollowsForUserByURL(user_id:string, url:string){
    try {
    const [result] = await db.select({feed_name:feeds.name, user_name:users.name, follow_id:feed_follows.id})
        .from(feed_follows)
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .where(and(eq(users.id, user_id), eq(feeds.url, url)));
    return result
}catch(err){
    console.error("DEBUG ERROR:", err);
    throw err;
    }
}

