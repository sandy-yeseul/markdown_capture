const puppeteer = require("puppeteer");

async function getList(){
    const url               = `https://ridibooks.com/keyword-finder/romance?order=recent&page=1&set_id=1`;
    const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[3]/label/span'; //단행본 태그
    const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span';
    const resultDivXpath    = '//*[@id="KeywordFinderRenewal"]/div[2]/div';
    const resultHeaderXpath = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
    const emptyHeaderXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/p';
    const ResultCountXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
    const bookClassSelector = '.RSGBookMetadata';
    const titleClassSelector= '.RSGBookMetadata_Title';
    const authorClassSelector= '.RSGBookMetadata_Authors';
    const priceClassSelector= '.RSGBookMetadata_Price_CurrentPrice';

    var bookList = [];

    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [getXpath] = await page.$x(sampleTagXpath);
        await getXpath.click();
        await page.waitForXPath(ResultCountXpath);
         
        // ANCHOR get book list -> book contain title, author, price
        // STUB problems: 
        // [v] price has two option, one book price and set books price
        // [ ] need books array to contain all books from different pages
        // [v] need to distinguish between title, author and price
        // [ ] one page -> tweet -> next page OR all books -> all tweet? 근데 트윗 리밋 안걸리려면 하나씩 올리는게 좋을듯

        //books: returning book objects with title, author, price
        const books = await page.$$eval(bookClassSelector, (bookElems) => 
        bookElems.map( (bookElem)=>{
            const title = bookElem.querySelector('.RSGBookMetadata_Title').textContent;
            const author = bookElem.querySelector('.RSGBookMetadata_Authors').textContent;
            const price = bookElem.querySelector('ul.RSGBookMetadata_Price_Row').childElementCount > 1 
                        ? bookElem.querySelector('li:nth-child(2) > span.RSGBookMetadata_Price_CurrentPrice').textContent
                        : bookElem.querySelector('.RSGBookMetadata_Price_CurrentPrice').textContent;
            const book = {
                title: title,
                author: author,
                price: price
            }
            return book;
        }))

        bookList = [...bookList, ...books];

        // go to next page

        await page.click('#KeywordFinderRenewal > div.ResultWrapper > div > nav > ul > a');
        await page.waitForXPath(ResultCountXpath);

        const books2 = await page.$$eval(bookClassSelector, (bookElems) => 
        bookElems.map( (bookElem)=>{
            const title = bookElem.querySelector('.RSGBookMetadata_Title').textContent;
            const author = bookElem.querySelector('.RSGBookMetadata_Authors').textContent;
            const price = bookElem.querySelector('ul.RSGBookMetadata_Price_Row').childElementCount > 1 
                        ? bookElem.querySelector('li:nth-child(2) > span.RSGBookMetadata_Price_CurrentPrice').textContent
                        : bookElem.querySelector('.RSGBookMetadata_Price_CurrentPrice').textContent;
            const book = {
                title: title,
                author: author,
                price: price
            }
            return book;
        }))
        bookList = [...bookList, ...books2];
        console.log(bookList);
        
        await browser.close();
    }
    catch(err){
        throw new Error(err.message);
    }
}
getList();