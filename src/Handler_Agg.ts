
import {scrapeFeeds} from "./helper_functions.js";


type Factor = {
    [key:string]:number;
}

export async function handlerAgg(cmdName:string, ...args:string[]): Promise<void>{
    if (args.length == 0){
        throw new Error(`Usage: ${cmdName} <time_between_reqs>`);

    }

    const time = parseDuration(args[0]);
    convert_time(time);
    await scrapeFeeds();
    const interval = setInterval(async() =>{await scrapeFeeds();}, time);
    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

function parseDuration(durationString:string):number{
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationString.match(regex);
    if (match == null){
        throw new Error(`Invalid duration string: ${match}`);
    }
    const factors:Factor = {'s': 1000, 'm': 60000, 'h': 3600000, 'ms': 1}
    const time = parseInt(match[1]);
    const time_scale = match[2];
    const factor = factors[time_scale];
    return time * factor;

}

function convert_time(time_in_ms:number):void{
    let seconds = time_in_ms/1000;
    let minutes = Math.floor(seconds/60);
    seconds = seconds - (minutes*60)
    const hours = Math.floor(minutes/60);
    minutes = minutes - (hours * 60);

    if (hours > 0){
        console.log(`Collecting Feeds every ${hours}h:${minutes}m:${seconds}s`);
    }
    else{
        console.log(`Collecting Feeds every ${minutes}m:${seconds}s`)
    }
}