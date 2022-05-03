import { markdownDb } from '../data-handler/db-handler.js';
import {makeBook} from '../model/book.js'
export{saveData}
async function saveData(markdownBookList, eventPeriod){
    try {
        eventPeriod = eventPeriod.split(": ")[1]
        const books = markdownBookList.map(book => {
            book.eventPeriod = eventPeriod;
            return makeBook(book);
        });
        const insertedCount = await markdownDb.insertManyBooks(books)
        return insertedCount;
    } catch (err) {
        console.log(err)
    }
}