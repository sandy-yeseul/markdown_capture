import { expect } from "chai";
import { getBooks } from "./get-data.js"
import { saveData } from "./save-data.js";

describe("save data", ()=>{
    it("must save data and get inserted count", async()=>{
        const {markdownBookList} = await getBooks();
        const insertedCount = await saveData(markdownBookList);
        expect(insertedCount).to.be.greaterThan(100);
    })
})