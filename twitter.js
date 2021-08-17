const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

let params = {screen_name: 'nodejs'};
client.get('satuses/user_timeline', params, (err, tweets, response)=>{
    if(err) return console.log(err);
    console.log(tweets)
})