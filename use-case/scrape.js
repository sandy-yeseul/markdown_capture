import puppeteer from "puppeteer";
async function test(){
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await gotToEventPage(page);
        var currentUrl = await page.url();
        console.log(currentUrl)

        await openMarkdownEventPage(page);
        var currentUrl = await page.url();
        console.log(currentUrl)

        const eventPeriod = await scrapeEventPeriod(page);
        console.log(eventPeriod)

        const markdownListEl = await page.$$eval(".event_detail_book_list_wrapper", listEls => {
            const res = [];
            const els = listEls[2].querySelectorAll(".book_macro_110")
            els.forEach(item => res.push(item.querySelector(".set_text").textContent))
            // const el = els.querySelectorAll(".set_text")
            // el.forEach(item => {res.push(item.textContent)})
            return res;
        })
        console.log(markdownListEl)
        
        browser.close();
    } catch (err) {
        console.log(err)
    }
}
export async function openPage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return page;
}

export async function gotToEventPage(page){
    const url = 'https://ridibooks.com/event/romance'
    await page.goto(url);
    return;
}
export async function openMarkdownEventPage(page){
    const eventTitleClassSelector = ".event_title";
    const eventName = "마크다운"
    const hrefArr = await page.$$eval(eventTitleClassSelector, (titleElems, eventName) => 
        titleElems.map(titleElem =>{
            if(titleElem.textContent.includes(eventName)) {
                // link가 /event/35425 이렇게 나와서 나중에 숫자만 extract 함
                return titleElem.firstElementChild.getAttribute('href')
            }
        }), eventName
    )
    let markdownEventUrlNumber = hrefArr.filter(item => item)[0].match(/\d+/)[0] // 숫자 extract
    const markDownPageUrl = `https://ridibooks.com/event/${markdownEventUrlNumber}`

    await page.goto(markDownPageUrl);
    return;
}
export async function scrapeEventPeriod(page){
    const noticeListSelector = ".notice_list";
    const eventPeriod = await page.$$eval(noticeListSelector, (noticeListEls)=> {
        return noticeListEls[1].firstElementChild.textContent
    })
    return eventPeriod;
}
export async function getMarkdownBooks(page){

}
export async function get100PointBackBookData(page){}
export async function getNew6BooksData(page){}
export function filterBooks(books, pointBackBook, new6books){
    let filteredBooks = books.filter(book => book.title !== pointBackBook.title)
    new6books.forEach(newBook => {
        filteredBooks = filteredBooks.filter(book => book.title !== newBook.title)
    })
    return filteredBooks;
}
test();