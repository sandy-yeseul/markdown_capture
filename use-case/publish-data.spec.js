import { expect } from "chai"
import { markdownDb } from "../data-handler/db-handler.js";
import { getBooksFromDb, getTwitter, tweetInitialTweet } from "./publish-data.js";

const eventPeriod = "2021년 11월 23일(화) ~ 11월 30일(화)";
describe("publish data", ()=>{
    it("must find all books", async()=>{
        const books = await getBooksFromDb(eventPeriod);
        expect(books).to.be.lengthOf.greaterThan(100)
    })
    it("must get twitter object", async()=>{
        const twitter = getTwitter();
        expect(twitter).to.be.an('object').and.to.have.property('request')
    })
    it("must tweet initial tweet", async()=>{
        console.log(await tweetInitialTweet(eventPeriod))
    })
    it("must tweet all books", async()=>{})
})