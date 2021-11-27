import { getBooks } from "./use-case/get-data.js";
import { getTwitter, tweetInitialTweet } from "./use-case/publish-data.js";

async function test(){
  try {
    // const result = await getBooks();
    // console.log(result)
   console.log(await tweetInitialTweet())
  } catch (err) {
    console.log(err)
  }
}
test()