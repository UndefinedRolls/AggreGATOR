import {XMLParser} from "fast-xml-parser"
export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    }
}

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}
export async function fetchFeed(feedURL:string){
    const headers = new Headers({
        "User-Agent": "gator",
        accept: "appliation/rss+xml",
    });
    const response  = await fetch(feedURL, {method:"GET",
    headers:headers,})
    if (!response.ok) {
        throw new Error(`failed to fetch feed: ${response.status}: ${response.statusText}`);
    }
    const text_response:string = await response.text();
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("xml") && !contentType.includes("rss")){
        throw new Error(`Expected RSS/XML but got ${contentType} from ${feedURL}`)
    }
    const parser = new XMLParser({processEntities:false});
    const jObj = parser.parse(text_response);
    const channel = jObj.rss?.channel;
    if (channel === undefined){
        throw new Error(`No channel found for feed "${feedURL}"`);
    }
    if (!channel ||
    !channel.title ||
    !channel.link ||
    !channel.description ||
    !channel.item){
        throw new Error("Unable to Parse channel");
    }

    let channel_items = Array.isArray(channel.item) ? channel.item : [channel.item];
    const rssItems: RSSItem[] = [];

    for (const item of channel_items) {
        if (!item.title|| !item.link ||
            !item.description || !item.pubDate){
            continue;
        }
        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate
        });
    }
    return {channel: {
                title: channel.title,
                link: channel.link,
                description: channel.description,
                item: rssItems,
        }
    }
}