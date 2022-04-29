import { getTwitter } from "./use-case/publish-data.js";

(async()=>{
    try {
        const twitter = getTwitter();

        const content = new Date().toLocaleString();

        const {id_str} = await twitter.post("statuses/update", {
            status: content
        })
    } catch (err) {
        console.log(err)
    }
})();