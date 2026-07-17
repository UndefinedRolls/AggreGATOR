import { XMLParser } from "fast-xml-parser";
export async function fetchFeed(feedURL) {
    const headers = new Headers({
        "User-Agent": "gator",
    });
    const response = await fetch(feedURL, { method: "GET",
        headers: headers, });
    const text_response = await response.text();
    const parser = new XMLParser({ processEntities: false });
    const jObj = parser.parse(text_response);
    const channel = jObj.rss.channel;
    if (channel === undefined) {
        throw new Error(`No channel found for feed "${feedURL}"`);
    }
    const channel_title = channel.title;
    const channel_link = channel.link;
    const channel_description = channel.description;
    if (channel_title === undefined || channel_link === undefined || channel_description === undefined) {
        throw new Error("Error parsing channel metadata");
    }
    let channel_items = new Array;
    if (Array.isArray(channel.item)) {
        for (let i = 0; i < channel.item.length; i++) {
            const item_data = { title: channel.item[i].title,
                link: channel.item[i].link,
                description: channel.item[i].description, };
            if (!item_data.title === undefined || item_data.link === undefined ||
                item_data.description === undefined) {
                continue;
            }
            channel_items.push(item_data);
        }
    }
    return { channelTitle: channel_title, channelLink: channel_link,
        channelDescription: channel_description,
        channelItems: channel_items };
}
