import { getAllFeeds, markFeedFetched } from "./lib/db/feeds.js";
import { fetchFeed } from "./fetchFeed.js";
export function printFeed(data) {
    console.log(`* ID:              ${data.feed.id}`);
    console.log(`* Created:         ${data.feed.createdAt}`);
    console.log(`* Updated:         ${data.feed.updatedAt}`);
    console.log(`* Name:            ${data.feed.name}`);
    console.log(`* URL:             ${data.feed.url}`);
    console.log(`* User:            ${data.feed.name}`);
}
export function printFeedList(feeds_list) {
    for (const pair of feeds_list) {
        console.log(`* ID:              ${pair.feed.id}`);
        console.log(`* Created:         ${pair.feed.createdAt}`);
        console.log(`* Updated:         ${pair.feed.updatedAt}`);
        console.log(`* Name:            ${pair.feed.name}`);
        console.log(`* URL:             ${pair.feed.url}`);
        console.log(`* User:            ${pair.user.name}`);
        console.log('~~*~~*~~*~~');
    }
}
export function printFeedFollows(data) {
    console.log(`* ID:              ${data.follows.id}`);
    console.log(`* Created:         ${data.follows.createdAt}`);
    console.log(`* Updated:         ${data.follows.updatedAt}`);
    console.log(`* Name:            ${data.feed.name}`);
    console.log(`* User:            ${data.user.name}`);
}
export async function getNextFeedToFetch() {
    const allFeeds = await getAllFeeds();
    const new_feed = allFeeds[0];
    return new_feed;
}
export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    const url = feed.url;
    const id = feed.id;
    try {
        const feed_text = await fetchFeed(url);
        console.log(feed_text);
        console.log(feed_text.channel.title);
        for (const item of feed_text.channel.item) {
            console.log(`-> ${item.title}`);
        }
        await markFeedFetched(id);
    }
    catch (err) {
        console.log(`failed to fetch ${url}: ${err}`);
    }
}
