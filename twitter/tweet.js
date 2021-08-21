
import { getBookList } from './scraper.js';
import { tweet as twitter } from './twitter.js';


let twitter_params ={ screen_name: 'ridi_MARKDOWN', }


export async function sendIntialTweet(period){
    const dateObj = new Date();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() +1;
    const initialTweet = `${year}년 ${month}월 마크다운 리스트\n기간: ${period}\n@${twitter_params.screen_name}`
    try {
        const tweet = await twitter.post('statuses/update', {status: initialTweet});
        return tweet;
    } catch (error) {
        console.log(error)
    }
}

// export async function replyTweet(replyId, tweetData){
//     try {
//         const tweetResult = await twitter.post('statuses/update', {status: initialTweet, trim_user: true});
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function sendTweet(data){
//     let replyId = ''
//     try {
//         const tweetResult = await twitter.post('statuses/update', {status: initialTweet, trim_user: true});
//         console.log(tweetResult)
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// function sendTweetThread(twitter, replyId){
//     const page = 0
//     const books = await getBookList(page);
//     const bookStr = `${year}년 ${month}월 마크다운\n《${books[3].title}》\n${books[3].author}\n${books[3].salePrice}\n${books[3].link}`
// }