const puppeteer = require("puppeteer");

async function getList(){
    const url = "https://ridibooks.com/keyword-finder/romance?set_id=1";

    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [getXpath] = await page.$x('//*[@id="KeywordFinderRenewal"]/div[1]/fieldset[6]/div/div/div[1]/ul/li[2]/label/span');
        const getTxt = await page.evaluate(name => name.innerText, getXpath);
        console.log(getTxt);

        await browser.close();

    }
    catch(err){
        throw new Error(err.message);
    }
}
getList();