import Twitter from 'twitter';
import {config} from 'dotenv';
import { markdownDb } from '../data-handler/db-handler';
config();

export {
    getTwitter,
    getBooksFromDb
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
function getBooksFromDb(eventPeriod){
    try {
        return await markdownDb.findBooks(eventPeriod);
    } catch (err) {
        console.log(err)
    }
}