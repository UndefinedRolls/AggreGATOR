import {fetchFeed} from "./fetchFeed.js";
import {getNextFeedToFetch} from "./helper_functions.js";
import {markFeedFetched} from "./lib/db/feeds.js";

export async function handlerAgg(cmdName:string, ...args:string[]): Promise<void>{
    /*if(!args[0]){
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0]
    console.log(await fetchFeed(url));*/

    const next_feed = await getNextFeedToFetch();
    const id:string = next_feed.id;
    await markFeedFetched(id);
    console.log(await getNextFeedToFetch());
}