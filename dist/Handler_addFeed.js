import { getUserByName } from "./lib/db/users.js";
import { readConfig } from "./config.js";
import { createFeed } from "./lib/db/feeds.js";
import { printFeed } from "./helper_functions.js";
export async function handlerAddFeed(cmdName, ...args) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }
    if (!args[0]) {
        throw new Error("A name is required for the feed.");
    }
    const current_user = readConfig().currentUserName;
    const user = await getUserByName(current_user);
    if (!user) {
        throw new Error(`User ${current_user}  not found`);
    }
    const id = user.id;
    const feed = await createFeed(args[0], args[1], id);
    if (!feed) {
        throw new Error(`Failed to create feed`);
    }
    printFeed(feed, user);
}
