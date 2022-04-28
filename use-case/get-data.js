import puppeteer from "puppeteer";

export {getBooks, openPage, gotToEventPage, openMarkdownEventPage, getEventPeriod, getMarkdownBooks}

async function getBooks(){
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await gotToEventPage(page);
        await openMarkdownEventPage(page);
        const eventPeriod = await getEventPeriod(page);
        const markdownBookList = await getMarkdownBooks(page);
        
        browser.close();

        return {eventPeriod, markdownBookList}
    } catch (err) {
        console.log(err)
    }
}
async function openPage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return page;
}

async function gotToEventPage(page){
    const url = 'https://ridibooks.com/event/romance'
    await page.goto(url);
    return;
}
async function openMarkdownEventPage(page){
    const eventDescriptionClassSelector = ".descript_body";
    const eventName = "마크다운"
    const hrefArr = await page.$$eval(eventDescriptionClassSelector, (descElems, eventName) => 
        descElems.map(descElem =>{
            if(descElem.textContent.includes(eventName)) {
                
                // link가 /event/35425 이렇게 나와서 나중에 숫자만 extract 함
                return descElem.closest('.event_description_wrapper').querySelector('a').href
            }
        }), eventName
    )
    let markdownEventUrlNumber = hrefArr.filter(item => item)[0].match(/\d+/)[0] // 숫자 extract
    const markDownPageUrl = `https://ridibooks.com/event/${markdownEventUrlNumber}`

    await page.goto(markDownPageUrl);
    return;
}
async function getEventPeriod(page){
    const noticeListSelector = ".notice_list";
    const eventPeriod = await page.$$eval(noticeListSelector, (noticeListEls)=> {
        return noticeListEls[1].firstElementChild.textContent
    })
    return eventPeriod;
}
async function getMarkdownBooks(page){
    const markdownListEl = await page.$$eval(".event_detail_book_list_wrapper", (listEls) => {
        const books = [];
        listEls.forEach(listEl => {
           const makrdownEls = listEl.querySelectorAll(".book_macro_110")
           makrdownEls.forEach(markdownEl => {
            const volumeEl = markdownEl.querySelector(".set_text");
            // 신작 6종 거르기 위해
            if(volumeEl === null) return;
            const volume = volumeEl.textContent;
            const link = markdownEl.querySelector(".title_link").href;
            const title = markdownEl.querySelector(".title_link").innerText;
            const author = markdownEl.querySelector(".author").innerText;
            const salePrice = markdownEl.querySelector(".price").innerText;
            const book = {title, author, salePrice, link, volume};
            books.push(book);
            })
        })        
        return books;
    })
    return markdownListEl;
}