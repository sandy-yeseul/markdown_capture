import {expect} from 'chai'
import {makeBook} from './book.js'

describe("testing book model", ()=>{
    describe("null checking", ()=>{
        it("must throw error: no title", ()=>{
            expect(()=>makeBook({}))
            .to.throw(Error, "제목이 없습니다.");
        })
        it("must throw error: no author", ()=>{
            expect(()=> makeBook({title: "title"}))
            .to.throw(Error, "작가가 없습니다.");
        })
        it("must throw error: no sale price", ()=>{
            expect(()=>makeBook({title: "title", author: "author"}))
            .to.throw(Error, "할인 가격이 없습니다.")
        })
        it("must throw error: no link", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10"}))
            .to.throw(Error, "링크가 없습니다.")
        })
        it("must throw error: no volume", ()=>{
            expect(()=>makeBook({title: "title", author:"author", salePrice: "10", link: "link"}))
            .to.throw(Error, "몇 권인지 표기해 주세요.")
        })
    })
    describe("format checking", ()=>{
        it("must throw syntax error: title not string", ()=>{
            expect(()=>makeBook({title: {}, author: "author", salePrice: "10", link: "link", volume: "3"}))
            .to.throw(SyntaxError, "제목이 스트링이 아닙니다.")
        })
        it("must throw syntax error: author not string", ()=>{
            expect(()=>makeBook({title: "title", author: 20, salePrice: "10", link: "link", volume: "3"}))
            .to.throw(SyntaxError, "작가가 스트링이 아닙니다.")
        })
        it("must throw syntax error: sale price not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: [], link: "link", volume: "3"}))
            .to.throw(SyntaxError, "할인 가격이 스트링이 아닙니다.");
        })
        it("must throw syntax error: sale price not correct number", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10by", link: "link", volume: "3"}))
            .to.throw(SyntaxError, "할인 가격이 올바른 숫자가 아닙니다.")
        })
        it("must throw syntax error: sale price not integer", ()=>{
            expect(()=> makeBook({title: "title", author: "author", salePrice: "10.5", link: "link", volume: "3"}))
            .to.throw(SyntaxError, "할인 가격이 정수가 아닙니다.")
        })
        it("must throw sytnax error: sale price below 0", ()=>{
            expect(()=> makeBook({title: "title", author: "author", salePrice: "-10", link: "link", volume: "3"}))
            .to.throw(SyntaxError, "할인 가격이 음수입니다.")
        })
        it("must throw syntax error: link not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: {}, volume: "3"}))
            .to.throw(SyntaxError, "링크가 스트링이 아닙니다.")
        })
        it("must throw syntax error: volume not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: "link", volume: ["3"]}))
            .to.throw(SyntaxError, "책 권수가 스트링이 아닙니다.")
        })
        it("must throw syntax error: volume not correct number", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: "link", volume: "ah1.1"}))
            .to.throw(SyntaxError, "책 권수가 올바른 숫자가 아닙니다.")
        })
        it("must throw syntax error: volume not integer", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: "link", volume: "3.5"}))
            .to.throw(SyntaxError, "책 권수가 정수가 아닙니다.")
        })
        it("must throw syntax error: volume below 0", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: "link", volume: "-10"}))
            .to.throw(SyntaxError, "책 권수가 음수입니다.")
        })
    })
    describe("normal book model", ()=>{
        const book = makeBook({title: "title", author: "author", salePrice: "10,700", link: "link", volume: "3"})
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
        it("should have salePrice", ()=>{
            expect(book).to.have.property("salePrice")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have link", ()=>{
            expect(book).to.have.property("link")
            .and.to.be.a("string")
            .and.to.be.lengthOf.at.least(2)
        })
        it("should have volume", ()=>{
            expect(book).to.have.property("volume")
            .and.to.be.a("string")
        })
    })
})