import { expect } from "chai";
import { getBooks } from "../use-case/get-data.js";
import { markdownDb } from "./db-handler.js"

describe("mongo db handling", ()=>{
    it("must build db", async()=>{
        const db = await markdownDb.getMarkdownDb();
        const dbName = "markdown";
        expect(db.s.namespace).to.have.property('collection', dbName)
    })
    it("must insert all books", async()=>{
        const docs = [{title: "title", author: "author"}, {title: "author", author: "auth"}]
        const insertedCount = await markdownDb.insertManyBooks(docs);
        expect(insertedCount).to.be.greaterThanOrEqual(2);
    })
    it("must find all books given period", async()=>{
        const eventPeriod = "2021년 10월 22일(금) ~ 10월 31일(일)"
        const books = await markdownDb.findBooks(eventPeriod);
        expect(books).to.be.null;
    })
})