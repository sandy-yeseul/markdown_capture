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
            expect(()=>makeBook({title: "title", author:"author", salePrice: "10", link: "https://ridibooks.com/a"}))
            .to.throw(Error, "몇 권인지 표기해 주세요.")
        })
        it("must throw error: no event period", ()=>{
            expect(()=>makeBook({title: "title", author:"author", salePrice: "10", link: "link", volume:"volume"}))
            .to.throw(Error, "이벤트 기간이 없습니다.")
        })
    })
    describe('type error', ()=>{
        it("must throw type error: title is not string", ()=>{
            expect(()=>makeBook({title: {}, author: "author", salePrice: "1000원", link: "https://ridibooks.com/a", volume: "3", eventPeriod:"event period"}))
            .to.throw(TypeError, "제목이 스트링이 아닙니다.")
        })
        it("must throw type error: author not string", ()=>{
            expect(()=>makeBook({title: "title", author: 20, salePrice: "1000원", link: "https://ridibooks.com/a", volume: "3", eventPeriod:"event period"}))
            .to.throw(TypeError, "작가가 스트링이 아닙니다.")
        })
        it("must throw syntax error: sale price not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: [], link: "https://ridibooks.com/a", volume: "3", eventPeriod:"event period"}))
            .to.throw(TypeError, "할인 가격이 스트링이 아닙니다.");
        })
        it("must throw syntax error: link not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "1000원", link: {}, volume: "3", eventPeriod:"event period"}))
            .to.throw(TypeError, "링크가 스트링이 아닙니다.")
        })
        it("must throw syntax error: volume not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "1000원", link: "https://ridibooks.com/a", volume: ["3"], eventPeriod:"event period"}))
            .to.throw(TypeError, "책 권수가 스트링이 아닙니다.")
        })
        it("must throw syntax error: event period not string", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "1000원", link: "https://ridibooks.com/a", volume: "3", eventPeriod:10}))
            .to.throw(TypeError, "이벤트 기간이 스트링이 아닙니다.")
        })
    })
    describe("error checking etc", ()=>{
        it("must throw error: sale price length is less than 4", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "10", link: "https://ridibooks.com/a", volume: "3", eventPeriod:'10'}))
            .to.throw(Error, '할인 가격의 글자수가 3자 이하입니다.')
        })
        // it("must throw error: price is not correct number", ()=>{
        //     expect(()=>makeBook({title: "title", author: "author", salePrice: "ㅁㅇㄹㄴㅁㅇ원", link: "link", volume: "3", eventPeriod:'10'}))
        //     .to.throw(Error, '할인 가격이 정확한 숫자가 아닙니다.')
        // })
        it("must throw error: link length is below 10", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "1000원", link: "https", volume: "3", eventPeriod:'10'}))
            .to.throw(Error, '링크가 10자 이하입니다.')
        })
        it("must throw error: link doesn't involve https://ridibooks.com", ()=>{
            expect(()=>makeBook({title: "title", author: "author", salePrice: "1000원", link: "https://ridibooks.com/a", volume: "3", eventPeriod:'10'}))
            .to.throw(Error, '할인 가격의 글자수가 3자 이하입니다.')
        })
        it("must throw error length is below 0", ()=>{})
        it("must throw error: volume is not correct number", ()=>{})
        it('must throw error: volume is below 0', ()=>{})
        it("must thorw error: length is below 10", ()=>{})
        it("must throw error: date is not now", ()=>{})
    })
    describe("normal book model", ()=>{
        const book = makeBook({title: "title", author: "author", salePrice: "10,700원", link: "https://ridibooks.com/a", volume: "3", eventPeriod:"event period"})
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