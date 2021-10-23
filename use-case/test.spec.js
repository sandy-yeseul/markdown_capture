import { expect } from "chai";
import { filterBooks, openPage } from "./scrape.js"

describe("get data", ()=>{
    describe("scrape from web page", ()=>{
        it("must open page", async()=>{
            const page = await openPage();
        })
        it("must set xPath for require ", async()=>{})
        it("must wait for page", async()=>{})
        it("must get event period", async()=>{})
        it("must get all book contents and make array", async()=>{})
        it("must return filtered book array: no point back, no new 6 books", async()=>{
            const books = [{title: "a"}, {title:"b"}, {title: "c"}, {title: "d"}, {title: "e"}];
            const pointBackBook = {title: "a"}
            const new6books = [{title: "c"}, {title: "d"}]
            const filteredBooks = filterBooks(books, pointBackBook, new6books);
            expect(filteredBooks).to.deep.equals([ { title: 'b' }, { title: 'e' } ])
        })
        it("must get new book 6 and filter out from array", async()=>{})
        it("must make book model for each book in array", async()=>{})
    })
})
describe("save data", ()=>{})
describe("publish data", ()=>{})