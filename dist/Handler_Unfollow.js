import { deleteFeedFollows, getFeedFollowsForUserByURL } from "./lib/db/feed_follows.js";
export async function handlerUnfollow(cmdName, user, ...args) {
    if (args.length < 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0];
    const follows = await getFeedFollowsForUserByURL(user.id, url);
    if (!follows) {
        throw new Error(`${user} does not currently follow ${url}`);
    }
    try {
        const newFollow = await deleteFeedFollows(follows.feed_follows.id);
        console.log(`${user.name} unfollowed ${url}`);
    }
    catch {
        throw new Error("Unable to delete follow");
    }
}
