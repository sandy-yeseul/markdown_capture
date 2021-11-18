import { expect } from "chai"
import { markdownDb } from "../data-handler/db-handler.js";
import { getBooksFromDb, getTwitter } from "./publish-data.js";

describe("publish data", ()=>{
    it("must find all books", async()=>{
        const eventPeriod = "2021년 10월 22일(금) ~ 10월 31일(일)";
        const books = await getBooksFromDb(eventPeriod);
        expect(books).to.be.lengthOf.greaterThan(100)
    })
    it("must get twitter object", async()=>{
        const twitter = getTwitter();
        expect(twitter).to.be.an('object').and.to.have.property('request')
    })
    it("must tweet initial tweet", async()=>{})
    it("must tweet all books", async()=>{})
})