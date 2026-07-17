import { getFeedsByURL } from "./lib/db/feeds.js";
import { readConfig } from "./config.js";
import { createFeedFollows, getFeedFollowsForUserByURL } from "./lib/db/feed_follows.js";
import { getUserByName } from "./lib/db/users.js";
import { printFeed } from "./helper_functions.js";
export async function handlerFollow(cmdName, ...args) {
    if (args.length < 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0];
    const user = readConfig().currentUserName;
    const feed = await getFeedsByURL(url);
    if (!feed) {
        throw new Error("feed not found.  use: addfeed <feed_name> <url>");
    }
    const user_data = await getUserByName(user);
    const follows = await getFeedFollowsForUserByURL(user_data.id, url);
    if (follows) {
        throw new Error(`${user} already follows ${follows.feed_name}`);
    }
    const newFollow = await createFeedFollows(feed.id, user_data.id);
    printFeed(newFollow);
}
