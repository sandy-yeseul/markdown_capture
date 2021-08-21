import Twitter from 'twitter';
import dotenv from 'dotenv';
dotenv.config();
import { getBookList } from './scraper.js';

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let params = {screen_name: 'nodejs'};




export async function sendTweet(data){

    const page = 0
    const books = await getBookList(page);
    const book = `《${books[0].title}》 \n${books[0].author} \n${books[0].salePrice} \n${books[0].link}`
    client.post('statuses/update', {status: book}, (err, tweet, result)=>{
        
    });
}
sendTweet(params)