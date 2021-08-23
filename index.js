import { getBookList } from "./scraper/scraper.js";
import { sendIntialTweet, replyTweet } from "./twitter/tweet.js";

async function runScript() {
  let page = 0;
  let isContinued = true;
  const period = `2021.08.23.(월) 07:00 ~ 2021.08.31.(화) 23:59`;
  try {
    var replyId = await sendIntialTweet(period);
    while (isContinued) {
      const books = await getBookList(page);
      if(!books) {
          isContinued = false;
          console.log("DONE");
          break;
        };
      console.log(books);
      for (var i = 0; i < books.length; i++) {
        var replyId = await replyTweet(replyId, books[i]);
      }
      page++;
    }
    console.log("Loop is done")
  } catch (error) {
    console.log(error);
  }
}
runScript();
