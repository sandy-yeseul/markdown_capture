import Twitter from 'twitter';
import {config} from 'dotenv';
config();

export {
    getTwitter,
    tweetInitialTweet,
    replyTweet
}

function getTwitter(){
    try {
        return new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        })
    } catch (err) {
        console.log(err);
    }
}
async function tweetInitialTweet(eventPeriod){
    try {
        const dt = new Date(),
        year = dt.getFullYear(),
        month = dt.getMonth() +1,
        initialTweetText =  `${year}년 ${month}월 마크다운 리스트
        \n기간: ${eventPeriod}`,
        twitter = getTwitter(),
        {id_str} = await twitter.post('statuses/update', {status: initialTweetText})
        return id_str
    } catch (err) {
        console.log(err);
    }
}
async function replyTweet(replyId, book){
    try {
        const tweetStr = `${book.title}\n${book.author}\n${book.salePrice}\n${book.link}`,
        twitter = getTwitter(),
        {id_str} = await twitter.post('statuses/update', {status: tweetStr, in_reply_to_status_id: replyId})
        return id_str
    } catch (err) {
        console.log(err)
    }
}
async function deleteTweet(tweetId){
    await twitter.post(`statuses/destroy/${tweetId}`)
}