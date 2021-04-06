const puppeteer = require("puppeteer");

async function getList(){
    const url               = "https://ridibooks.com/keyword-finder/romance?set_id=1";
    const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[3]/label/span'; //단행본 태그
    const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span';
    const resultDivXpath    = '//*[@id="KeywordFinderRenewal"]/div[2]/div';
    const resultHeaderXpath = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
    const emptyHeaderXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/p';
    const ResultCountXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';

    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [getXpath] = await page.$x(sampleTagXpath);
        await getXpath.click();
        await page.waitForXPath(ResultCountXpath);

        /** 결과: 6000+건의 작품이 있습니다 잘 출력됨
        // const [resultCounterX] = await page.$x(ResultCountXpath);
        // const resultCounter = await page.evaluate(name => name.innerText, resultCounterX); 
        // console.log(resultCounter);
        */

        /** 첫번째꺼 잘 나옴... 전부 다 이긴 하지만..
        const [titleXpath] = await page.$x('/html/body/div[3]/div[1]/div/div/section/div[2]/div/section/ul/li[1]/div/div[2]');
        const title = await page.evaluate(name => name.innerText, titleXpath);
        console.log(title)
         */
        
        // const prices = await page.$$eval('.RSGBookMetadata_Price_CurrentPrice', span => span.length)
        // console.log(prices);
        // const price = await page.$eval('.RSGBookMetadata_Price_CurrentPrice', el => el.innerHTML)
        // console.log(price)
        
        // const [resultXpath] = await page.$x(resultDivXpath);
        // const results = await resultXpath.getProperties();
        // console.log(results.size);
        // const result = await page.evaluate(name => name.innerText, resultXpath);
        // console.log(result);

        await browser.close();

    }
    catch(err){
        throw new Error(err.message);
    }
}
getList();