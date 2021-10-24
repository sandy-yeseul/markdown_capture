import { expect } from "chai";
import { getBooks } from "../use-case/get-data.js";
import { markdownDb } from "./db-handler.js"

describe("mongo db handling", ()=>{
    it("must build db", async()=>{
        const db = await markdownDb.getMarkdownDb();
        const dbName = "markdown";
        await db.drop();
        expect(db.s.namespace).to.have.property('collection', dbName)
    })
    it("must insert all books", async()=>{
        const {markdownBookList} = await getBooks();
        const insertedCount = await markdownDb.insertManyBooks(markdownBookList);
        expect(insertedCount).to.be.greaterThan(100);
    })
})