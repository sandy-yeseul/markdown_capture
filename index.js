import { getBookList } from './scraper/scraper.js';
import {sendIntialTweet, replyTweet} from './twitter/tweet.js'

async function runScript(){
    const page = 0
    
    const period = `2021년 8월 23일 수요일 ~ 31일 금요일`
    try {
        var replyId = await sendIntialTweet(period);
        const books = await getBookList(page);
        for(var i= 0; i< books.length; i++){
            var replyId = await replyTweet(replyId, books[i]);
        }
    } catch (error) {
        console.log(error)
    }
}
runScript();