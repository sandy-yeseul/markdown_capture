// import { getBookList } from "./scraper/scraper.js";
// import { sendIntialTweet, replyTweet } from "./twitter/tweet.js";

// async function runScript() {
//   let page = 0;
//   let isContinued = true;
//   const period = `2021.08.23.(월) 07:00 ~ 2021.08.31.(화) 23:59`;
//   try {
//     var replyId = await sendIntialTweet(period);
//     while (isContinued) {
//       const books = await getBookList(page);
//       if(!books) {
//           isContinued = false;
//           console.log("DONE");
//           break;
//         };
//       console.log(books);
//       for (var i = 0; i < books.length; i++) {
//         var replyId = await replyTweet(replyId, books[i]);
//       }
//       page++;
//     }
//     console.log("Loop is done")
//   } catch (error) {
//     console.log(error);
//   }
// }
// runScript();

// 20일부터 30일까지 하루 몇번씩? 돌리기
// 돌릴때 mongod에서 찾아봐서 이번달 날짜가 있을 경우 (쿼리 어떻게 하지... 한 10일 이내로?) skip하기
// 아닐 경우 scrape -> mongo 저장 -> twitter publish 하기
// 근데 만약 등록 같은 것을 하려면 역시 express 돌려야 하나? 아닌데...