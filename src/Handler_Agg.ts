import {fetchFeed} from "./fetchFeed.js";

export async function handlerAgg(cmdName:string, ...args:string[]): Promise<void>{
    if(!args[0]){
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0]
    console.log(await fetchFeed(url));
}