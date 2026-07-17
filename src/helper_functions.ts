import {Feed} from "./lib/db/feeds.js";
import {User} from "./lib/db/users.js";
import {FeedFollow} from "./lib/db/feed_follows.js";

export function printFeed(data: {feed:Feed, user:User}| {feed:Feed, user:User, follows:FeedFollow}){
    console.log(`* ID:              ${data.feed.id}`);
    console.log(`* Created:         ${data.feed.createdAt}`);
    console.log(`* Updated:         ${data.feed.updatedAt}`);
    console.log(`* Name:            ${data.feed.name}`);
    console.log(`* URL:             ${data.feed.url}`);
    console.log(`* User:            ${data.feed.name}`);
}

export function printFeedList(feeds_list:{user:User,feed:Feed}[]) {
    for (const pair of feeds_list) {
        console.log(`* ID:              ${pair.feed.id}`);
        console.log(`* Created:         ${pair.feed.createdAt}`);
        console.log(`* Updated:         ${pair.feed.updatedAt}`);
        console.log(`* Name:            ${pair.feed.name}`);
        console.log(`* URL:             ${pair.feed.url}`);
        console.log(`* User:            ${pair.user.name}`);
        console.log('~~*~~*~~*~~')
    }
}
export function printFeedFollows(data: {feed:Feed, user:User, follows:FeedFollow}){
        console.log(`* ID:              ${data.follows.id}`);
        console.log(`* Created:         ${data.follows.createdAt}`);
        console.log(`* Updated:         ${data.follows.updatedAt}`);
        console.log(`* Name:            ${data.feed.name}`);
        console.log(`* User:            ${data.user.name}`);
    }