import {readConfig} from "./config.js";
import {getFeedFollowsForUser} from "./lib/db/feed_follows.js";
import {getUserByName, User} from "./lib/db/users.js";
import {printFeedList} from "./helper_functions.js";

export async function handlerFollowing(cmdName:string, user:User, ...args:string[]): Promise<void>{

    const follows = await getFeedFollowsForUser(user.id);

    if (follows.length === 0){
        console.log(`user ${user.name} does not follow any feeds.`)
    }
    printFeedList(follows);

}