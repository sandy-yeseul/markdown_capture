import { expect } from "chai"
import { markdownDb } from "../data-handler/db-handler.js";
import { getBooks } from "./get-data.js";
import { getTwitter, replyTweet, tweetInitialTweet } from "./publish-data.js";
import { saveData } from "./save-data.js";

let books, initialTweetId, eventP

describe("publish data", ()=>{
    before(async()=> {
        const {markdownBookList, eventPeriod} = await getBooks()
        eventP = eventPeriod.split(': ')[1]
        await saveData(markdownBookList, eventPeriod)
    })
    after(async()=> await markdownDb.deleteBooksByEventPeriod(eventP))
    
    it("must find all books", async()=>{
        books = await markdownDb.findBooks(eventP);
        expect(books).to.be.lengthOf.greaterThan(100)
    })
    it("must get twitter object", async()=>{
        const twitter = getTwitter();
        expect(twitter).to.be.an('object').and.to.have.property('request')
    })
    it("must tweet initial tweet", async()=>{
        initialTweetId = await tweetInitialTweet(eventP)
        expect(initialTweetId).to.be.a('string')
    })
    it("must tweet 1 book for testing", async()=>{
        const tweetId = await replyTweet(initialTweetId, books[0])
        console.log(tweetId)
        expect(tweetId).to.be.a("string")
    })
})