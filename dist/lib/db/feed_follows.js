import { db } from "./index.js";
import { feed_follows } from "./schema.js";
import { feeds } from "./schema.js";
import { users } from "./schema.js";
import { eq, and } from "drizzle-orm";
export async function createFeedFollows(feed_id, user_id) {
    const [result] = await db.insert(feed_follows).values({
        user_id: user_id,
        feed_id: feed_id
    }).returning();
    return returnFollowFeedsByID(result.id);
}
async function returnFollowFeedsByID(joint_id) {
    return db.select({ feed: feeds, user: users })
        .from(feed_follows).leftJoin(feeds, eq(feeds.id, feed_follows.feed_id)).leftJoin(users, eq(users.id, feed_follows.user_id))
        .where(eq(feed_follows.id, joint_id));
}
export async function getFeedFollowsForUser(user_id) {
    return db.select({ feed: feeds, user: users })
        .from(feed_follows)
        .leftJoin(feeds, eq(feeds.user_id, user_id))
        .leftJoin(users, eq(users.id, user_id))
        .where(eq(feed_follows.user_id, user_id));
}
export async function getFeedFollowsForUserByURL(user_id, url) {
    try {
        const [result] = await db.select({ feed_name: feeds.name, user_name: users.name, follow_id: feed_follows.id })
            .from(feed_follows)
            .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
            .innerJoin(users, eq(feed_follows.user_id, users.id))
            .where(and(eq(users.id, user_id), eq(feeds.url, url)));
        return result;
    }
    catch (err) {
        console.error("DEBUG ERROR:", err);
        throw err;
    }
}
