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

    // let nextBtn           = `//*[@id="KeywordFinderRenewal"]/div[2]/div/nav/ul/a`;
    // const nextBtn2          = `//*[@id="KeywordFinderRenewal"]/div[2]/div/nav/ul/a[2]`;

    var bookList = [];

    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [getXpath] = await page.$x(markdownTagXpath);
        await getXpath.click();
        await page.waitForXPath(ResultCountXpath);


        let isContinued = true;
        let nextBtn = `//*[@id="KeywordFinderRenewal"]/div[2]/div/nav/ul/a`;
        while (isContinued) {
            const getUrl = await page.url(); 
            console.log(getUrl)

            //NOTE get Book
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

            //NOTE add to book list
            bookList = [...bookList, ...books];
            
            //NOTE go to Next page
            const [nextBtnXpath] = await page.$x(nextBtn);
            //NOTE check if available
            if(nextBtnXpath === undefined) break;
            await nextBtnXpath.click();
            await page.waitForXPath(ResultCountXpath);

            //NOTE set next btn again for 2nd page and +a
            nextBtn = `//*[@id="KeywordFinderRenewal"]/div[2]/div/nav/ul/a[2]`;

        }
        

        /** ANCHOR get to search page

        var getUrl = await page.url();
        console.log(getUrl)

        // await page.waitForTimeout(1000);

        // ANCHOR get book list -> book contain title, author, price
        // STUB problems: 
        // [v] price has two option, one book price and set books price
        // [ ] need to go to next page and loop it until it's done
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
        // console.log(bookList);

        //ANCHOR go to next page

        const [nextBtnXpath] = await page.$x(nextBtn)
        await nextBtnXpath.click();
        await page.waitForXPath(ResultCountXpath);

        getUrl = await page.url();
        console.log(getUrl)
        //ANCHOR in 2nd page
        // await page.waitForTimeout(1000);

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

        //ANCHOR go to 3rd page
        await page.waitForTimeout(1000); //NOTE doesn't work unless wait for some time
        const [next2] = await page.$x(nextBtn2);
        await next2.click();
        await page.waitForXPath(ResultCountXpath);

        //ANCHOR in 3rd page

        getUrl = await page.url();
        console.log(getUrl);

        const books3 = await page.$$eval(bookClassSelector, (bookElems) => 
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

        bookList = [...bookList, ...books3];

        //ANCHOR print book list
       // console.log(bookList);

        let isCotinued = true;
        let pageNumber = 1;
        while(isCotinued){
            if(pageNumber === 1){
                
            }else{
                console.log(pageNumber);
                isCotinued=false
            }
            pageNumber++;
        }

        // check if next page available
        
        // const nextIcon = await page.$('.Pagination_GoNextIcon');
        // const nextBtn = await nextIcon.$x('./div'); // parent node
        // console.log(nextBtn.length)

        /**
        while(await page.$('.Pagination_GoNextIcon')){

        const nextIcon = await page.$('.Pagination_GoNextIcon');
        const nextBtn = await nextIcon.$x('./a');

        await page.waitForXPath(ResultCountXpath);

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
        console.log(bookList);
        }
        console.log(bookList);
        */
        
        await browser.close();
    }
    catch(err){
        console.log(err)
    }
}
getList();