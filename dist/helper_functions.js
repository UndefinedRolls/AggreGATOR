export function printFeed(feed, user) {
    console.log(`* ID:              ${feed.id}`);
    console.log(`* Created:         ${feed.createdAt}`);
    console.log(`* Updated:         ${feed.updatedAt}`);
    console.log(`* Name:            ${feed.name}`);
    console.log(`* URL:             ${feed.url}`);
    console.log(`* User:            ${user.name}`);
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
