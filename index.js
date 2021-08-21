import { getBookList } from './scraper/scraper.js';
import {sendIntialTweet, replyTweet} from './twitter/tweet.js'

async function runScript(){
    // const page = 0
    // const books = await getBookList(page);
 

    const period = `2021년 8월 23일 수요일 ~ 31일 금요일`
    try {
        let replyId = await sendIntialTweet(period);
        replyId = await replyTweet(replyId, period);
        console.log(replyId)
        
    } catch (error) {
        console.log(error)
    }
}
runScript();