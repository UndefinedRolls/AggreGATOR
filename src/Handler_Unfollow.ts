import {getFeedsByURL} from "./lib/db/feeds.js";
import {deleteFeedFollows, getFeedFollowsForUserByURL} from "./lib/db/feed_follows.js";
import {User} from "./lib/db/users.js";
export async function handlerUnfollow(cmdName:string, user:User,  ...args:string[]): Promise<void>{
    if (args.length < 1){
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const url:string = args[0];
    const follows = await getFeedFollowsForUserByURL(user.id, url);
    if (!follows){
        throw new Error(`${user} does not currently follow ${url}`)
    }
    try {
        const newFollow = await deleteFeedFollows(follows.feed_follows.id);

        console.log(`${user.name} unfollowed ${url}`)
    }
    catch{
        throw new Error("Unable to delete follow");
    }
}