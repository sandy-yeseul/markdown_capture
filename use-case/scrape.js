import puppeteer from "puppeteer";

export async function openPage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    browser.close();
}

export async function gotToEventPage(page){
    const url = ''
    await page.goto(url);
}
export async function findMarkdownEventPage(page){

}
export async function openMarkdownEventPage(page){}
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