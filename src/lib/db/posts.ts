import {feed_follows, feeds, posts, users} from "./schema.js";
import {RSSItem} from "../../fetchFeed.js";
import {db} from "./index.js";
import {asc, desc, eq} from "drizzle-orm";

export type Post = typeof posts.$inferSelect;

export async function createPost(post:RSSItem, feed_id:string){

    const date = new Date(post.pubDate);
    const [result] = await db.insert(posts).values({
        title: post.title,
        url: post.link,
        description: post.description,
        publishedAt: date,
        feed_id: feed_id
    })
    return result;
}

export async function getPostsForUser(user_id:string, num_posts:number = 2){
    return db.select({feed:feeds, post:posts})
        .from(posts)
        .innerJoin(feed_follows, eq(posts.feed_id, feed_follows.feed_id))
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .where(eq(feeds.user_id, user_id))
        .orderBy(desc(posts.publishedAt))
        .limit(num_posts);
}