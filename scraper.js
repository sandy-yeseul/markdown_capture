import puppeteer from 'puppeteer';

const url               = `https://ridibooks.com/keyword-finder/romance?order=recent&page=1&set_id=1`;
const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[3]/div/div/div[1]/ul/li[20]/label/span'; //여공남수 태그
const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span';
const resultDivXpath    = '//*[@id="KeywordFinderRenewal"]/div[2]/div';
const resultHeaderXpath = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
const emptyHeaderXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/p';
const ResultCountXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
const bookClassSelector = '.RSGBookMetadata';
const titleClassSelector= '.RSGBookMetadata_Title';
const authorClassSelector= '.RSGBookMetadata_Authors';
const priceClassSelector= '.RSGBookMetadata_Price_CurrentPrice';

export async function getBookList(pageCount){
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const [getXpath] = await page.$x(sampleTagXpath);
      await getXpath.click();

      for (var i = 0; i++; i <= pageCount) {
        const nextBtnIcon = await page.$(".RSGIcon-arrowRight");
        if(nextBtnIcon === null) {return false;} // NOTE to stop the loop and return false to index to stop the loop
        const nextBtn = await nextBtnIcon.getProperty("parentNode");
        nextBtn.asElement().click();
        await page.waitForTimeout(1000); // NOTE or else they repeat page
      }

      await page.waitForXPath(ResultCountXpath);
      const getUrl = page.url();

      const books = await page.$$eval(bookClassSelector, (bookElems) =>
        bookElems.map((bookElem) => {
          const title = bookElem.querySelector(".RSGBookMetadata_Title").textContent;
          const author = bookElem.querySelector(".RSGBookMetadata_Authors").textContent;
          const price = bookElem.querySelector("ul.RSGBookMetadata_Price_Row")
                        .childElementCount > 1 
                        ? bookElem.querySelector("li:nth-child(2) > span.RSGBookMetadata_Price_CurrentPrice").textContent
                        : bookElem.querySelector(".RSGBookMetadata_Price_CurrentPrice").textContent;
          const book = {
            title: title,
            author: author,
            price: price,
          };
          return book;
        })
      );
      await browser.close();
      return books;
    } catch (err) {
      throw new Error(err.message)
    }
}