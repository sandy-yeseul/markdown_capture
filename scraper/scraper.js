import puppeteer from 'puppeteer';

const url               = `https://ridibooks.com/keyword-finder/romance?order=recent&page=1&set_id=1`;
const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[3]/div/div/div[1]/ul/li[20]/label/span'; //여공남수 태그
const glTagXpath        = `//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[1]/div/div/div[1]/ul/li[12]/label/span`;
const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[3]/label/span';
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

const nextBtnIconSelector = ".RSGIcon-arrowRight";
const bookHelper = {
  title: titleClassSelector,
  author: authorClassSelector,
  priceParent: priceParentClassSelector,
  price1: priceClassSelector1,
  price2: priceClassSelector2
}

export async function getBookList(pageCount){
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const [getXpath] = await page.$x(markdownTagXpath);
      await getXpath.click();
      await page.waitForXPath(ResultCountXpath);
      let isContinued = true;
      // ANCHOR go next page
      console.log(`~~~~~~~~~~~${pageCount}`)
      for (var i = 0; i < pageCount; i++) {
        console.log(`${i}\n`)
        await page.waitForXPath(ResultCountXpath);
        var nextBtnIcon = await page.$(nextBtnIconSelector);
        if (nextBtnIcon !== null) {
          var nextBtn = await nextBtnIcon.getProperty("parentNode");
          await nextBtn.asElement().click();
          await page.waitForTimeout(1000);
        }
        else {
          isContinued = false;
          console.log(`${pageCount}~~~~~~~~~~~`)
          return isContinued;
        }
      }

      // ANCHOR Scrape Books in 1 page
      const books = await page.$$eval(
        bookClassSelector,
        (bookElems, bookHelper) =>
          bookElems.map((bookElem) => {
            const title = bookElem.querySelector(bookHelper.title).textContent;
            const author = bookElem.querySelector(
              bookHelper.author
            ).textContent;
            const price =
              bookElem.querySelector(bookHelper.priceParent).childElementCount >
              1
                ? bookElem.querySelector(bookHelper.price1).textContent
                : bookElem.querySelector(bookHelper.price2).textContent;
            const link = bookElem.querySelector(bookHelper.title).href;
            let book = {
              title: title,
              author: author,
              salePrice: price,
              link: link,
            };
            return book;
          }),
        bookHelper
      );
      await browser.close();
      return books;
    } catch (err) {
      console.log
    }
}

// document.querySelector('#page_event_list > ul.event_list_wrapper > li:nth-child(1) > div > ul > li:nth-child(1) > span.descript_body').innerText
// "2021.08.23.(월) 07:00 ~ 2021.08.31.(화) 23:59"

// var textElem = document.querySelector('#page_event_list > ul.event_list_wrapper > li:nth-child(1) > div > h3 > a')
// if(textElem.textContent.includes('마크다운')){
//   document.querySelector('#page_event_list > ul.event_list_wrapper > li:nth-child(1) > div > h3 > a').href
// }