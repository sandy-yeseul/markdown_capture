const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let params = {screen_name: 'nodejs'};



async function tweet(){
    const booklist = await require('./index')
    const book = await booklist[0]
    console.log(book)
    // await client.post('statuses/update', {status: book},  function(error, tweet, response) {
    //     if(error) throw error;
    //     console.log(tweet.text)
    //   });
}
tweet();