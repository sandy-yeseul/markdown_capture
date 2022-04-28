import { expect } from "chai";
import { markdownDb } from "../data-handler/db-handler.js";
import { getBooks } from "./get-data.js"
import { saveData } from "./save-data.js";

let eventP
describe("save data", ()=>{
    after(async()=>{
        await markdownDb.deleteBooksByEventPeriod(eventP)
    })
    it("must save data and get inserted count", async()=>{
        const {markdownBookList, eventPeriod} = await getBooks();
        eventP = eventPeriod.split(": ")[1]
        const insertedCount = await saveData(markdownBookList, eventPeriod);
        expect(insertedCount).to.be.greaterThan(100);
    })
})