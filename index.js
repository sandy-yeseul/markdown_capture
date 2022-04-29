import { markdownDb } from './data-handler/db-handler.js';
import { getBooks } from './use-case/get-data.js';
import { replyTweet, tweetInitialTweet } from './use-case/publish-data.js';
import { saveData } from './use-case/save-data.js'

async function runScript() {
  try {
    console.log(new Date().toLocaleString())
    const scrapedData = await getBooks();

    if(scrapedData === false) return;

    const {markdownBookList, eventPeriod: eventP} = scrapedData;

    const eventPeriod = eventP.split(': ')[1]
    console.log(eventPeriod)
    console.log(new Date().toLocaleString())

    const hasBook = await markdownDb.findOneBookWithEventPeriod(eventPeriod)
    if(hasBook !== null && hasBook !== undefined) return;
    console.log(new Date().toLocaleString() + 'done finding any book(아 혹시 return되나?')

    await saveData(markdownBookList, eventP);
    console.log(new Date().toLocaleString() +'done saving')

    let replyId = await tweetInitialTweet(eventPeriod);

    const books = await markdownDb.findBooks(eventPeriod);
    console.log(new Date().toLocaleString() +'done initial tweet')

    for(let i = 0; i<3; i++){
        const book = books[i]
        console.log(replyId)
        replyId = await replyTweet(replyId, book);
        await markdownDb.updateTweetId(book._id, replyId)
    }
    console.log(new Date().toLocaleString())
  } catch (err) {
    console.log(err);
  }
}
runScript();