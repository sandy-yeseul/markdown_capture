
import { getBookList } from './scraper.js';
import { tweet } from './twitter.js';


let params ={ screen_name: 'ridi_MARKDOWN', }


export async function sendTweet(data){
    const dateObj = new Date();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() +1;
    const page = 0
    const books = await getBookList(page);
    const bookStr = `${year}년 ${month}월 마크다운\n《${books[3].title}》\n${books[3].author}\n${books[3].salePrice}\n${books[3].link}`
     
    const tweetParams = {trim_user: true}
    tweet.post('statuses/update', {status: bookStr, in_reply_to_status_id: '1429008326432477186', tweetParams}, (err, tweet, result)=>{
        if(err) console.log(err)
        console.log(tweet)
    });
    
}
sendTweet(params)