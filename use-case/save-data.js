import { MongoClient } from 'mongodb';
import { markdownDb } from '../data-handler/db-handler.js';
import {makeBook} from '../model/book.js'
import { getBooks } from './get-data.js';
export{saveData}
async function saveData(){
    const {eventPeriod, markdownBookList} = await getBooks();
    const books = markdownBookList.map(book => makeBook(book));
    const res = await markdownDb.insertManyBooks(books)
    console.log(res)
}
saveData();