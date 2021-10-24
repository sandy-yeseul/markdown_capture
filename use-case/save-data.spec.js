import { expect } from "chai";
import { markdownDb } from "../data-handler/db-handler.js";
import { getBooks } from "./get-data.js"
import { saveData } from "./save-data.js";

describe("save data", ()=>{
    it("must save data and get inserted count", async()=>{
        const {markdownBookList, eventPeriod} = await getBooks();
        const insertedCount = await saveData(markdownBookList, eventPeriod);
        expect(insertedCount).to.be.greaterThan(100);
    })
    it("must find all books", async()=>{
        const eventPeriod = "2021년 10월 22일(금) ~ 10월 31일(일)";
        const books = await markdownDb.findBooks(eventPeriod);
        console.log(books);
    })
})