import {sendTweet} from './twitter.js';
import { getBookList } from './scraper.js';

async function runScript(){
    const page = 0
    const books = await getBookList(page);
    console.log(books)
}
runScript();