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
  tweetId
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

    const book = Object.freeze({
      _id,
      title,
      author,
      salePrice,
      link,
      volume,
      eventPeriod
    })
    return book;
  } 
}
/**
 * NOTE 정보 긁어오기
 * 흠...
 * 1. 정확한 페이지인지? 마크다운 이벤트가 실행되고 있는지?
 * 2. 이벤트가 시작된 후 긁어와야 함. 아니면 에러 핸들링 따로 하던지.
 * 3. 전부 다 긁어 왔다는 확신?
 * -> 이벤트 페이지 자체도 그런데 마크다운 태그로 검색해서 비교할까?
 */
/**
 * NOTE 중요한 것들
 * 1. 항목이 아예 없으면 안되는 것들 null 체크
 * 2. 항목에서 틀린 정보가 들어오면 안되니 그런것 다 체크
 * 3. 책 제목이 정말 마크다운 리스트에 존재하는지? 체크해야 하나
 * 4. 책 정보가 틀릴 경우가 어떻게 될까... 뭐 undefined나 null, error 같은걸로 스크랩 될 수도 있을까?
 * 5. 일단은 지금 syntax 검사는 type으로만 하는데... 길이나 이런것도 확인해야 하나?
 * 6. 중요한 것을 생각해보자.. 일단 title, author, salePrice, link, volume, eventPeriod 전부 null 이 되면 안됨. 중요한 필수 정보임
 * 7. 그리고 title, author, salePrice, volume, eventPeriod 모두 human-readable 정보여야 함
 * 8. title, author, salePrice, link, volume가 이 책 저 책 섞여 있으면 안되고 모두 같은 책에서 나온 정보라는 것을 확증할 수 있어야 함
 * 9. title, author, salePrice, link, volume이 마크다운 이벤트 리스트에 있는 것이 확인되어야 한다?
 * 10. id가 겹치면 안됨. 정말 중요한 정보. id가 겹치면 몽고디비 에러가 나니까...
 *  -> 이거 사실 막을 수 있을것 같은건 지금 id generator + Date.now().toString() 붙여주면 완벽한데... 굳이? 싶은 것은 있긴 해.
 * 11. link가 지속적으로 업데이트 되어야 하나? 왜냐면 링크 사실 마크다운 이벤트 책 페이지라... 이벤트 끝나면 사라지지 않나?
 *  -> 하지만 지금 당장은 이 링크가 쓸모 있는 링크라는 확증이 있어야 함. broken page 보여주지 않고 정확한 페이지 보여주는지 확인해야 함.
 * 이 정도가 정보가 저장되기 전까지 검사되어야 하는 것인가?
 */

/**
 * NOTE db에서 꺼내오기 
 * 1. 정보가 다 저장된 후 해야 함
 * 2. 꺼내오는 정보가 정말 지금 이벤트 기간인지 확인해야 함
 * 3. 그 정도만 확신하면 mongodb 안에 들어간 정보가 바뀔리가 없으니까... 괜찮지 않나?
 * 4. modifi count 같은거...?
 */
/**
 * NOTE publish
 * 1. 흠... 이 단계에서 정보 자체를 의심할 필요는 없을 듯!
 * 2. 그냥 트윗이 제대로 갔는지, 제대로 스레드로 연결되어 있는지? 같은거 생각하면 되나?
 */
/**
 * NOTE 제목 규칙
 * 1. 한 글자일 수도 있음.
 * 2. 영어일 수도 있음.
 * 3. 어쩌면 컴퓨터가 이해하지 못한느 수준에서 human-readable 일 수 있음.
 * 4. 진짜 garbage text만 아니면 되는데... 근데 일부러 그렇게 이름 지을 수도 있지 않을까?
 * 5. 그럼 그냥 무조건 믿을까? 
 * 6. 나중에 이게 다 같은 책인지ㅁ만 검사할까? 그래서 사실 정보만 제대로 있으면 되잖아...
 */
/**
 * NOTE 작가 규칙
 * 1. 한 글자일 수도 있음
 * 2. 영어일 수도 있음
 * 3. 컴퓨터가 이해하지 못하는 수준의 garbage text일 수 있음
 * 4. 그래서 있는지만 검사하기! 한 글자라도 있어야 함
 */
/**
 * NOTE 할인 가격 규칙
 * 1. 100원 아래로 내려갈 수 있나...?
 * 2. 97원 이렇게 
 * 3. 음... 렝스 2 이상 되는지만 확인하자. 원 + 숫자 하나
 * 4. 이건 말도 안된다. 렝스 4까지는 확인해야 한다. 100 단위 + 원
 * 5. 그리고 원 떼고 숫자가 맞는지도 확인! 어차피 다 똑같은 원 일테니 str.sub() 같은거 쓰던지
 */
/**
 * NOTE 링크 규칙
 * 1. 이거는 일단 length > 10? 
 * 2. 사실 진짜 먹히는 링크 인지가 제일 중요하다
 * 3. 그걸 여기서...? 검사할 수는 없겠군... 그냥 앞에 https://ridibooks.com/ 있는지만 검사할까?
 */
/**
 * NOTE 권수 규칙
 * 1. length 어느 정도 이상... 은 아니고 권 세트 이거 떼내고 length 1 이상
 * 2. 권 이상 이거 떼낸 후 정상적인 숫자인지
 * 3. 막 음수 이런거 아닌지... 당연히 아니겠지
 */
/**
 * NOTE 이벤트 기간 규칙
 * 1. 이건... 스트링이라 내가 뭐 기간 비교도 못할 테고... 어떻게 확인하지?
 * 2. 제일 중요한 것: 지금 날짜라는 것...
 */
/**
 * NOTE
 * 근데 리디 실수로 뭐가 잘못 올라가면 내가 바꿔줘야 하는데... 그건 어떻게 하지?
 * 업뎃은 현재 못 하는데...
 */