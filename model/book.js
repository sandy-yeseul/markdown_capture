import { v4 as uuidv4 } from 'uuid';
const makeBook = buildBook(generateId);
export {makeBook}

function generateId(){
  const uuid = uuidv4();
  const id = uuid.replace(/-/g, "");
  return id;
}

function buildBook(generateId){ 
  return({
  _id,
  title,
  author,
  salePrice,
  link,
  volume,
  eventPeriod,
  tweetId,
  createdAt
  })=>{
    //ANCHOR null checking
    if(!title) throw new Error("제목이 없습니다.")
    if(!author) throw new Error("작가가 없습니다.")
    if(!salePrice) throw new Error("할인 가격이 없습니다.")
    if(!link) throw new Error("링크가 없습니다.")
    if(!volume) throw new Error("몇 권인지 표기해 주세요.")
    if(!eventPeriod) throw new Error("이벤트 기간이 없습니다.")

    //ANCHOR type error checking
    if(typeof title !== "string") throw new TypeError("제목이 스트링이 아닙니다.")
    if(typeof author !== "string") throw new TypeError("작가가 스트링이 아닙니다.")
    if(typeof salePrice !== "string") throw new TypeError("할인 가격이 스트링이 아닙니다.")
    if(typeof link !== "string") throw new TypeError("링크가 스트링이 아닙니다.")
    if(typeof volume !=="string") throw new TypeError("책 권수가 스트링이 아닙니다.")
    if(typeof eventPeriod !=="string") throw new TypeError("이벤트 기간이 스트링이 아닙니다.")
    if(tweetId && typeof tweetId !== 'string') throw new TypeError('tweet id가 스트링이 아닙니다.')

    // ANCHOR syntax checking
    if(salePrice.length < 4) throw new Error('할인 가격의 글자수가 3자 이하입니다.')
    if(!Number.isSafeInteger(Number(salePrice.split('원')[0].replace(/,/g, '')))) throw new Error('할인 가격이 정확한 숫자가 아닙니다.')
    if(link.length < 10 ) throw new Error("링크가 10자 이하입니다.")
    if(!link.includes('https://ridibooks.com')) throw new Error("올바른 링크가 아닙니다.")
    if(!Number.isSafeInteger(Number(volume.split('권 세트')[0]))) throw new Error("권 수가 정확한 숫자가 아닙니다.")
    if(tweetId && tweetId.length < 2) throw new Error('tweet id가 1글자 입니다.')

    //ANCHOR format data
    if(!_id) _id = generateId();
    if(!createdAt) createdAt = new Date();

    const book = Object.freeze({
      _id: String(_id),
      title: String(title),
      author: String(author),
      salePrice: String(salePrice),
      link: String(link),
      volume: String(volume),
      eventPeriod: String(eventPeriod),
      tweetId,
      createdAt: new Date(createdAt)
    })
    return book;
  } 
}