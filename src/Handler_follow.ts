import {getFeedsAndUserName} from "./lib/db/feeds.js";

export async function handlerFollow(cmdName:string, ...args:string[]): Promise<void>{
    if (args.length < 1){
        throw new Error(`usage: ${cmdName} <name>`)
    }
    const feeds_list = await getFeedsAndUserName();
    if (feeds_list.length === 0){
        console.log("No feeds found.")
        return;
    }

    console.log(`Found ${feeds_list.length} feeds:`);
}