import { markdownDb } from '../data-handler/db-handler.js';
import {makeBook} from '../model/book.js'
export{saveData}
async function saveData(markdownBookList){
    const books = markdownBookList.map(book => makeBook(book));
    const insertedCount = await markdownDb.insertManyBooks(books)
    return insertedCount;
}