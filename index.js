import {sendTweet} from './twitter.js';
import { getBookList } from './scraper.js';

async function runScript(){
    // for (let i = 0; i <= 2; i++) {
        
    // }
    const books = await getBookList(0);
        console.log(books)
}
runScript();