import { expect } from 'chai'

describe('test 10 minutes trigger', ()=>{
    it('should run every 10 minutes', ()=>{
        console.log(new Date().toLocaleString())
        expect(new Date()).to.be.an("Date")
    })
})