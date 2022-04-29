import { expect } from "chai";
import { markdownDb } from "./db-handler.js"

const eventPeriod = Date.now(),
tweetId = Date.now().toString(),
docs = [
    {
       _id: 0, title: "title", author: "author", eventPeriod
    }, 
    {
      _id: 1,  title: "author", author: "auth", eventPeriod
    }]
describe("mongo db handling", ()=>{
    it("must build db", async()=>{
        const db = await markdownDb.getMarkdownDb();
        const collection = "markdown";
        expect(db.s.namespace).to.have.property('collection', collection)
    })
    it("must insert all books", async()=>{
        const insertedCount = await markdownDb.insertManyBooks(docs);
        expect(insertedCount).to.be.greaterThanOrEqual(2);
    })
    it("must find all books given period", async()=>{
        const books = await markdownDb.findBooks(eventPeriod);
        expect(books).to.be.lengthOf(2);
    })
    it("must update tweet id for one book", async()=>{
        const updated = await markdownDb.updateTweetId(docs[0]._id, tweetId)
        expect(updated).to.haveOwnProperty("tweetId", tweetId)
    })
    it('must delete all books by event period', async()=>{
        await markdownDb.deleteBooksByEventPeriod(eventPeriod);
        const books = await markdownDb.findBooks(eventPeriod);
        expect(books).to.be.empty;
    })
})