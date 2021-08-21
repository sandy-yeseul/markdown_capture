import { twitter } from './twitter.js';


let twitter_params ={ screen_name: 'ridi_MARKDOWN', }


export async function sendIntialTweet(period){
    const dateObj = new Date();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() +1;
    const initialTweet = `${year}년 ${month}월 마크다운 리스트\n기간: ${period}\n@${twitter_params.screen_name}`
    try {
        const tweet = await twitter.post('statuses/update', {status: initialTweet});
        const replyId = tweet['id_str'];
        return replyId
    } catch (error) {
        console.log(error)
    }
}

export async function replyTweet(replyId, tweetData){
    try {
        const tweetResult = await twitter.post('statuses/update', {status: tweetData, in_reply_to_status_id: replyId});
        replyId = tweetResult['id_str']
        return replyId;
    } catch (error) {
        console.log(error)
    }
}

// export async function sendTweet(data){
//     let replyId = ''
//     try {
//         const tweetResult = await twitter.post('statuses/update', {status: initialTweet, trim_user: true});
//         console.log(tweetResult)
//     } catch (error) {
//         console.log(error)
//     }
    
// }