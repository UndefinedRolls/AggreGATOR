import {fetchFeed} from "./fetchFeed.js";

export async function handlerAgg(cmdName:string, ...args:string[]): Promise<void>{
    if(!args[0]){
        //throw new Error("Feed Location required");
        var url = "https://www.wagslane.dev/index.xml"
    }
    else{
        url = args[0]
    }
    console.log(await fetchFeed(url));
}