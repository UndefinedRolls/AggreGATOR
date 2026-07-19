import {getFeedsByURL} from "./lib/db/feeds.js";
import {createFeedFollows, getFeedFollowsForUserByURL} from "./lib/db/feed_follows.js";
import {printFeedFollows} from "./helper_functions.js";
import {User} from "./lib/db/users.js";

export async function handlerFollow(cmdName:string, user:User,  ...args:string[]): Promise<void>{
    if (args.length < 1){
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const url:string = args[0];
    const feed = await getFeedsByURL(url);
    if (!feed){
        throw new Error("feed not found.  use: addfeed <feed_name> <url>")
    }
    const follows = await getFeedFollowsForUserByURL(user.id, url);
    if (follows){
        throw new Error(`${user} already follows ${follows.feed.name}`)
    }
    const newFollow = await createFeedFollows(feed.id, user.id);

    printFeedFollows(newFollow);

}