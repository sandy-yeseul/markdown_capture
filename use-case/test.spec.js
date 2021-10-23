import { openPage } from "./scrape.js"

describe("get data", ()=>{
    describe("scrape from web page", ()=>{
        it("must open page", async()=>{
            const res = await openPage();
            console.log(res)
        })
        it("must set xPath for require ", async()=>{})
        it("must wait for page", async()=>{})
        it("must get event period", async()=>{})
        it("must get all book contents and make array", async()=>{})
        it("must get 100% point back book information and filter out from array", async()=>{})
        it("must get new book 6 and filter out from array", async()=>{})
        it("must make book model for each book in array", async()=>{})
    })
})
describe("save data", ()=>{})
describe("publish data", ()=>{})