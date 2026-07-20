import { getFeedsByURL } from "./lib/db/feeds.js";
import { createFeedFollows, getFeedFollowsForUserByURL } from "./lib/db/feed_follows.js";
import { printFeedFollows } from "./helper_functions.js";
export async function handlerFollow(cmdName, user, ...args) {
    if (args.length < 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0];
    const feed = await getFeedsByURL(url);
    if (!feed) {
        throw new Error("feed not found.  use: addfeed <feed_name> <url>");
    }
    const follows = await getFeedFollowsForUserByURL(user.id, url);
    if (follows) {
        throw new Error(`${user} already follows ${follows.feed.name}`);
    }
    const newFollow = await createFeedFollows(feed.id, user.id);
    printFeedFollows(newFollow);
}
