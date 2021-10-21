import {expect} from 'chai'
import buildBook from './book.js'

describe("testing book model", ()=>{
    describe("null checking", ()=>{
        it("must throw error: no title", ()=>{
            expect(()=>buildBook())
            .to.throw(Error);
        })
        it("must throw error: no author", ()=>{
            expect(()=> buildBook({title: "title"}))
            .to.throw(Error);
        })
        // it("must throw error: no publisher", ()=>{})
        it("must throw error: no sale price", ()=>{
            expect(()=>buildBook({title: "title", author: "author"}))
            .to.throw(Error)
        })
        // it("must throw error: no price", ()=>{})
    })
    describe("format checking", ()=>{
        it("must throw syntax error: title not string", ()=>{
            expect(()=>buildBook({title: {}, author: "author", salePrice: 10}))
            .to.throw(SyntaxError)
        })
        it("must throw syntax error: author not string", ()=>{
            expect(()=>buildBook({title: "title", author: 10, salePrice: 10}))
            .to.throw(SyntaxError)
        })
        // it("must throw error: publisher not string", ()=>{})
        it("must throw syntax error: sale price not string", ()=>{
            expect(()=>buildBook({title: "title", author: "author", salePrice: []}))
            .to.throw(SyntaxError);
        })
        it("must throw syntax error: sale price not whoel number", ()=>{
            expect(()=>buildBook({title: "title", author: "author", salePrice: -10}))
            .to.throw(SyntaxError) &&
            expect(()=>buildBook({title: "title", author: "author", salePrice: 10.5}))
            .to.throw(SyntaxError)
        })
        // it("must throw error: price not number", ()=>{})
        // it("must throw error: price not whoel number", ()=>{})
    })
    describe("normal book model", ()=>{
        const book = buildBook({title: "title", author: "author", salePrice: "12,500"})
        it("must be frozen object", ()=>{
            expect(book).to.be.an("object").and.to.be.frozen
        })
        it("should have _id", ()=>{
            expect(book).to.have.property("_id")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have title", ()=>{
            expect(book).to.have.property("title")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have author", ()=>{
            expect(book).to.have.property("author")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have publisher", ()=>{
            expect(book).to.have.property("publisher")
        })
        it("should have salePrice", ()=>{
            expect(book).to.have.property("salePrice")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have price", ()=>{
            expect(book).to.have.property("price")
        })
    })
})