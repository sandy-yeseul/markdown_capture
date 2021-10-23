import puppeteer from "puppeteer";
export async function openPage(){
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await gotToEventPage(page);
        var currentUrl = await page.url();
        console.log(currentUrl)

        await openMarkdownEventPage(page);
        var currentUrl = await page.url();
        console.log(currentUrl)

        browser.close();
    } catch (err) {
        console.log(err)
    }
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
export async function scrapeEventPeriod(page){}
export async function get100PointBackBookData(page){}
export async function getNew6BooksData(page){}
export async function getAllBooks(page){}
export function filterBooks(books, pointBackBook, new6books){
    let filteredBooks = books.filter(book => book.title !== pointBackBook.title)
    new6books.forEach(newBook => {
        filteredBooks = filteredBooks.filter(book => book.title !== newBook.title)
    })
    return filteredBooks;
}
openPage();