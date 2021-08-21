import { getBookList } from "./scraper/scraper.js";
import { sendIntialTweet, replyTweet } from "./twitter/tweet.js";

async function runScript() {
  let page = 0;
  let isContinued = true;
  const period = `2021년 8월 23일 수요일 ~ 31일 금요일`;
  try {
    var replyId = await sendIntialTweet(period);
    while (page < 5) {
      const books = await getBookList(page);
      console.log(books);
      for (var i = 0; i < books.length; i++) {
        var replyId = await replyTweet(replyId, books[i]);
      }
      page++;
    }
  } catch (error) {
    console.log(error);
  }
}
runScript();
