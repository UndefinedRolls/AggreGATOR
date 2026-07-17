import { getFeedsAndUserName } from "./lib/db/feeds.js";
import { printFeedList } from "./helper_functions.js";
export async function handlerFeeds(cmdName, ...args) {
    const feeds_list = await getFeedsAndUserName();
    if (feeds_list.length === 0) {
        console.log("No feeds found.");
        return;
    }
    /*console.log(`Found ${feeds_list.length} feeds: `);
    for (const feedUser of feeds_list){
        console.log(`->Username: ${feedUser.users.name}`);
        console.log(`     ->Feed: ${feed.Name}\n     ->URL: ${feed.URL}`);
    }*/
    printFeedList(feeds_list);
}
