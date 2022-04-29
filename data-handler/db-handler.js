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
        insertManyBooks,
        findBooks,
        deleteBooksByEventPeriod,
        updateTweetId
    })
    async function getMarkdownDb(){
        try {
            const db = await makeDb();
            return await db.collection('markdown');
        } catch (err) {
            console.log(err)
        }
    }
    async function insertManyBooks(books){
        try {
            const db = await getMarkdownDb();
            const {insertedCount} = await db.insertMany(books);
            return insertedCount;
        } catch (err) {
            console.log(err)
        }
    }
    async function findBooks(eventPeriod){
        try {
            const db = await getMarkdownDb();
            const query = {eventPeriod};
            const cursor = db.find(query);
            return db.find(query).toArray();
        } catch (err) {
            console.log(err)
        }
    }
    async function deleteBooksByEventPeriod(eventPeriod){
        try {
            const db = await getMarkdownDb(),
            query = {eventPeriod}
            return db.deleteMany(query)
        } catch (err) {
            console.log(err)
        }
    }
    async function updateTweetId(_id, tweetId){
        try {
            const db = await getMarkdownDb(),
            query = {_id},
            update = {$set: {tweetId}},
            option = {returnDocument: "after"},
            {value} = await db.findOneAndUpdate(query, update, option)
            return value;
        } catch (error) {
            
        }
    }
}