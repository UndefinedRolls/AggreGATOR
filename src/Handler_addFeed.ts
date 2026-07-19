import {getUserByName} from "./lib/db/users.js";
import {readConfig} from "./config.js";
import {createFeed} from "./lib/db/feeds.js";
import {printFeedFollows} from "./helper_functions.js";
import {createFeedFollows} from "./lib/db/feed_follows.js";
import {User} from "./lib/db/users.js";

export async function handlerAddFeed(cmdName:string, user:User, ...args:string[]): Promise<void>{
    if(args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }
    if (!args[0])   {
        throw new Error("A name is required for the feed.");
    }
    const id = user.id;
    const feed = await createFeed(args[0], args[1], id);
    if (!feed){
        throw new Error(`Failed to create feed`);
    }
    const new_feed = await createFeedFollows(feed.id, user.id);
    printFeedFollows(new_feed);


}

