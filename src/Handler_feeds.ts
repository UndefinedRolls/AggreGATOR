import {getFeedsAndUserName} from "./lib/db/feeds.js";

export async function handlerFeeds(cmdName:string, ...args:string[]): Promise<void>{
    const feeds_list = await getFeedsAndUserName();
    if (feeds_list.length === 0){
        console.log("No feeds found.")
        return;
    }

    console.log(`Found ${feeds_list.length} feeds:`);
}