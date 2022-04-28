import { expect } from "chai";
import { getBooks, openMarkdownEventPage, gotToEventPage, openPage, getEventPeriod, getMarkdownBooks } from "./get-data.js"

describe("get data", ()=>{
    describe("scrape from web page", ()=>{
        let page
        it("must open page", async()=>{
            page = await openPage();
            expect(page).to.be.an("object")
        })
        it("must go to event list page", async()=>{
            const url = 'https://ridibooks.com/event/romance'
            await gotToEventPage(page)
            const currentUrl = page.url();
            expect(currentUrl).to.be.equal(url);
        })
        it("must open markdown event page", async()=>{
            await openMarkdownEventPage(page);
            const currentUrl = page.url();
            const url = "https://ridibooks.com/event/"
            expect(currentUrl).to.include(url);
        })
        it("must get event period", async()=>{
            const eventPeriod = await getEventPeriod(page);
            const eventPeriodStr = "-이벤트 기간"
            expect(eventPeriod).to.include(eventPeriodStr)
        })
        it("must get markdown event book list", async()=>{
            const books = await getMarkdownBooks(page);
            console.log(books[0])
            expect(books).to.have.lengthOf.at.least(100)
        })
    })
})