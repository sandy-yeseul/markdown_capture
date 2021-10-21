const { expect } = require("chai");

describe("testing book model", ()=>{
    describe("null checking", ()=>{
        it("must throw error: no title", ()=>{})
        it("must throw error: no author", ()=>{})
        // it("must throw error: no publisher", ()=>{})
        it("must throw error: no sale price", ()=>{})
        // it("must throw error: no price", ()=>{})
    })
    describe("format checking", ()=>{
        it("must throw error: title not string", ()=>{})
        it("must throw error: author not string", ()=>{})
        // it("must throw error: publisher not string", ()=>{})
        it("must throw error: sale price not number", ()=>{})
        it("must throw error: sale price not whoel number", ()=>{})
        // it("must throw error: price not number", ()=>{})
        // it("must throw error: price not whoel number", ()=>{})
    })
})