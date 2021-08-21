import { getBookList } from './scraper.js';
import {sendIntialTweet} from './tweet.js'

async function runScript(){
    // const page = 0
    // const books = await getBookList(page);
    // console.log(books)

    const period = `2021년 8월 23일 수요일 ~ 31일 금요일`
    try {
        const replyId = await sendIntialTweet(period)
        console.log(replyId)
        console.log(replyId['id_str'])
    } catch (error) {
        console.log(error)
    }
}
runScript();