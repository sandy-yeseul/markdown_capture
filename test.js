import { getTwitter } from "./use-case/publish-data.js";

(async()=>{
    try {
        const twitter = getTwitter();

        console.log(process.env.TWITTER_CONSUMER_KEY)
        console.log(process.env.TWITTER_CONSUMER_SECRET)
        console.log(process.env.TWITTER_ACCESS_TOKEN_KEY)
        console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET)

        const content = new Date().toLocaleString();

        const {id_str} = await twitter.post("statuses/update", {
            status: content
        })
    } catch (err) {
        console.log(err)
    }
})();