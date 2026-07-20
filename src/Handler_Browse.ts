import {getPostsForUser, Post} from "./lib/db/posts.js";
import {User} from "./lib/db/users.js";
import {Feed} from "./lib/db/feeds.js";


export async function handlerBrowse(cmdName:string, user:User, ...args:string[]): Promise<void> {
    const user_id = user.id;
    const posts:{feed:Feed, post:Post}[] = await getPostsForUser(user_id);
    console.log(`Displaying ${posts.length} posts for User ${user.name}`)
    for (const post of posts){
        console.log(post);
        console.log(`From: ${post.feed.name}`);
        console.log(`》》》${post.post.title}《《《`);
        console.log(`Published On: ${post.post.publishedAt}`);
        console.log(`     ${post.post.description}`);
        console.log(`Link: ${post.post.url}`);
        console.log(`✦ · · ✦ · · ✦ · · ✦ · · ✦ · · ✦ · · ✦ · · ✦ · · ✦ · · ✦`)
    }
}