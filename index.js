import { markdownDb } from './data-handler/db-handler.js';
import { getBooks } from './use-case/get-data.js';
import { replyTweet, tweetInitialTweet } from './use-case/publish-data.js';
import { saveData } from './use-case/save-data.js'

async function runScript() {
  try {
    const scrapedData = await getBooks();

    if(scrapedData === false) return;

    const {markdownBookList, eventPeriod: eventP} = scrapedData;

    const eventPeriod = eventP.split(': ')[1]

    const hasBook = await markdownDb.findOneBookWithEventPeriod(eventPeriod)
    if(hasBook !== null && hasBook !== undefined) return;

    await saveData(markdownBookList, eventP);

    let replyId = await tweetInitialTweet(eventPeriod);

    const books = await markdownDb.findBooks(eventPeriod);

    for(let i = 0; i<3; i++){
        const book = books[i]
        console.log(replyId)
        replyId = await replyTweet(replyId, book);
        await markdownDb.updateTweetId(book._id, replyId)
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("DONE")
  }
}
runScript();