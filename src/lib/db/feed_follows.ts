import {db} from "./index.js";
import {feed_follows} from "./schema.js";
import {feeds} from "./schema.js";
import {users} from "./schema.js";
import {eq} from "drizzle-orm"

export async function createFeedFollows(feed_id:string, user_id:string){
    const [result] = await db.insert(feed_follows).values({
        user_id:user_id,
        feed_id:feed_id
    }).returning();
    return returnFollowFeedsByID(result.id);

}

async function returnFollowFeedsByID(joint_id:string){
    return db.select({feed_name:feeds.name, user_name:users.name, follow_id:feed_follows.id, follow_createdAt:feed_follows.createdAt,
        follow_updatedAt:feed_follows.updatedAt, follow_feed_id:feed_follows.feed_id, follow_user_id:feed_follows.user_id})
        .from(feed_follows).leftJoin(feeds, eq(feeds.id, feed_follows.feed_id)).leftJoin(users, eq(users.id, feed_follows.user_id))
            .where(eq(feed_follows.id, joint_id));
}

export async function getFeedFollowsForUser(user_id:string){
    return db.select({feed_name:feeds.name, user_name:users.name, follow_id:feed_follows.id})
        .from(feed_follows)
        .leftJoin(feeds, eq(feeds.user_id, user_id))
        .leftJoin(users, eq(users.id, user_id))
        .where(eq(feed_follows.user_id, user_id));

}
