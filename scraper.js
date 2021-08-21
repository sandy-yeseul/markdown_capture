import puppeteer from 'puppeteer';
import {makeBook} from './model/index.js'

const url               = `https://ridibooks.com/keyword-finder/romance?order=recent&page=1&set_id=1`;
const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[3]/div/div/div[1]/ul/li[20]/label/span'; //여공남수 태그
const glTagXpath        = `//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[1]/div/div/div[1]/ul/li[12]/label/span`;
const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span';
const resultDivXpath    = '//*[@id="KeywordFinderRenewal"]/div[2]/div';
const resultHeaderXpath = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
const emptyHeaderXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/p';
const ResultCountXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
const bookClassSelector = '.RSGBookMetadata';
const titleClassSelector= '.RSGBookMetadata_Title';
const authorClassSelector= '.RSGBookMetadata_Authors';
const priceParentClassSelector= `ul.RSGBookMetadata_Price_Row`;
const priceClassSelector1= `li:nth-child(2) > span.RSGBookMetadata_Price_CurrentPrice`;
const priceClassSelector2= '.RSGBookMetadata_Price_CurrentPrice';
const bookHelper = {
  title: titleClassSelector,
  author: authorClassSelector,
  priceParent: priceParentClassSelector,
  price1: priceClassSelector1,
  price2: priceClassSelector2,
  makeBook: makeBook
}

export async function getBookList(pageCount){
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const [getXpath] = await page.$x(glTagXpath);
      await getXpath.click();
      await page.waitForXPath(ResultCountXpath);

      const books = await page.$$eval(bookClassSelector, (bookElems, bookHelper) => 
                bookElems.map( async (bookElem)=>{
                    const title = await bookElem.querySelector(bookHelper.title).textContent;
                    const author = await bookElem.querySelector(bookHelper.author).textContent;
                    const price = await bookElem.querySelector(bookHelper.priceParent).childElementCount > 1 
                                ? bookElem.querySelector(bookHelper.price1).textContent
                                : bookElem.querySelector(bookHelper.price2).textContent;
                    const book = {
                        title: title,
                        author: author,
                        salePrice: price
                    }
                    return book;
                }), bookHelper
                
                )


      await browser.close();
      console.log(books)
    } catch (err) {
      console.log
    }
}
getBookList(url);