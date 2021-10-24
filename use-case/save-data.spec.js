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
})