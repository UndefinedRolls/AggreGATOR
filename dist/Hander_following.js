import { getFeedFollowsForUser } from "./lib/db/feed_follows.js";
import { printFeedList } from "./helper_functions.js";
export async function handlerFollowing(cmdName, user, ...args) {
    const follows = await getFeedFollowsForUser(user.id);
    if (follows.length === 0) {
        console.log(`user ${user.name} does not follow any feeds.`);
    }
    printFeedList(follows);
}
