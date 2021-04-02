const puppeteer = require("puppeteer");

async function getList(){
    const url               = "https://ridibooks.com/keyword-finder/romance?set_id=1";
    const sampleTagXpath    = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[1]/label/span';
    const markdownTagXpath  = '//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span';
    const resultDivXpath    = '//*[@id="KeywordFinderRenewal"]/div[2]/div';
    const resultHeaderXpath = '//*[@id="KeywordFinderRenewal"]/div[2]/div/header/div[1]';
    const emptyHeaderXpath  = '//*[@id="KeywordFinderRenewal"]/div[2]/div/p';


    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [getXpath] = await page.$x(sampleTagXpath);
        await getXpath.click();
        await page.waitForXPath(resultHeaderXpath);
        
        const [resultXpath] = await page.$x(resultHeaderXpath);
        const result = await page.evaluate(name => name.innerText, resultXpath);
        console.log(result);

        await browser.close();

    }
    catch(err){
        throw new Error(err.message);
    }
}
getList();