import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

const markdownDb = buildMarkdownDB(makeDb);
export {makeDb, markdownDb}

async function makeDb(){
    try {
        await client.connect()
        const db = client.db(dbName);
        return db
    } catch (err) {
        console.log(err)
    }
}
function buildMarkdownDB(makeDb){
    return Object.freeze({
        getMarkdownDb,
        insertManyBooks
    })
    async function getMarkdownDb(){
        const db = await makeDb();
        const collection = await db.collection('markdown');
        return collection
    }
    async function insertManyBooks(books){
        const db = await getMarkdownDb();
        const {insertedCount} = await db.insertMany(books);
        return insertedCount;
    }
}