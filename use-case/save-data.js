import { MongoClient } from 'mongodb';
import {makeBook} from '../model/book.js'
import { getBooks } from './get-data.js';
export{saveData}
async function saveData(){
    const {eventPeriod, markdownBookList} = await getBooks();
    const books = markdownBookList.map(book => makeBook(book));
    const db = await getDb();
    const res = await db.collection('markdown').insertMany(books);
    console.log(res)
}
saveData();
async function getDb(){
    try {
        const url = 'mongodb+srv://Sandy:20tprlthsus@cluster0.4z9dn.mongodb.net/markdownDB?retryWrites=true&w=majority';
        const dbName = 'markdownDB';
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        const db = client.db(dbName);
        return db
    } catch (error) {
        console.log(error)
    }
}