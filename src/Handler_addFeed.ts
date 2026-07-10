import {getUserByName, User} from "./lib/db/users.js";
import {readConfig} from "./config.js";
import {createFeed, Feed} from "./lib/db/feeds.js";

export async function handlerAddFeed(cmdName:string, ...args:string[]): Promise<void>{
    if(args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }
    if (!args[0])   {
        throw new Error("A name is required for the feed.");
    }
    const current_user = readConfig().currentUserName;
    const user = await getUserByName(current_user);
    if (!user) {
        throw new Error(`User ${current_user}  not found`);
    }
    const id = user.id;
    const feed = await createFeed(args[0], args[1], id);
    if (!feed){
        throw new Error(`Failed to create feed`);
    }
    printFeed(feed, user);
}

function printFeed(feed:Feed, user:User){
    console.log(`* ID:              ${feed.id}`);
    console.log(`* Created:         ${feed.createdAt}`);
    console.log(`* Updated:         ${feed.updatedAt}`);
    console.log(`* Name:            ${feed.name}`);
    console.log(`* URL:             ${feed.url}`);
    console.log(`* User:            ${user.name}`);
}