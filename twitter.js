import Twitter from 'twitter';
import dotenv from 'dotenv';
dotenv.config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let params = {screen_name: 'nodejs'};



export async function sendTweet(data){
    client.post('statuses/update', {status: data},  function(error, tweet, response) {
        if(error) throw error;
        return tweet;
      });
}