import { v4 as uuidv4 } from "uuid"
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
  eventPeriod
  })=>{
        //ANCHOR null checking
        if(!title) throw new Error("제목이 없습니다.")
        if(!author) throw new Error("작가가 없습니다.")
        if(!salePrice) throw new Error("할인 가격이 없습니다.")
        if(!link) throw new Error("링크가 없습니다.")
        if(!volume) throw new Error("몇 권인지 표기해 주세요.")
        if(!eventPeriod) throw new Error("이벤트 기간이 없습니다.")

        // ANCHOR format checking
        if(typeof title !== "string") throw new SyntaxError("제목이 스트링이 아닙니다.")
        if(typeof author !== "string") throw new SyntaxError("작가가 스트링이 아닙니다.")
        if(typeof salePrice !== "string") throw new SyntaxError("할인 가격이 스트링이 아닙니다.")
        if(typeof link !== "string") throw new SyntaxError("링크가 스트링이 아닙니다.")
        if(typeof volume !=="string") throw new SyntaxError("책 권수가 스트링이 아닙니다.")
        if(typeof eventPeriod !=="string") throw new SyntaxError("이벤트 기간이 스트링이 아닙니다.")

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