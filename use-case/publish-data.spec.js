import { expect } from "chai"
import { markdownDb } from "../data-handler/db-handler.js";

describe("publish data", ()=>{
    it("must find all books", async()=>{
        const eventPeriod = "2021년 10월 22일(금) ~ 10월 31일(일)";
        const books = await markdownDb.findBooks(eventPeriod);
        expect(books).to.be.lengthOf.greaterThan(100)
    })
    it("must connect to twitter", async()=>{})
    it("must tweet initial tweet", async()=>{})
    it("must tweet all books", async()=>{})
})