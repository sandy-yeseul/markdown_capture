import { v4 as uuidv4 } from "uuid"
const makeBook = buildBook(generateId);
export {makeBook}
function buildBook(generateId){ 
  return({
  _id,
  title,
  author,
  salePrice,
  link,
  volume
})=>{
    //ANCHOR null checking
    if(!title) throw new Error("제목이 없습니다.")
    if(!author) throw new Error("작가가 없습니다.")
    if(!salePrice) throw new Error("할인 가격이 없습니다.")
    if(!link) throw new Error("링크가 없습니다.")
    if(!volume) throw new Error("몇 권인지 표기해 주세요.")

    // ANCHOR format checking
    if(typeof title !== "string") throw new SyntaxError("제목이 스트링이 아닙니다.")
    if(typeof author !== "string") throw new SyntaxError("작가가 스트링이 아닙니다.")
    if(typeof salePrice !== "string") throw new SyntaxError("할인 가격이 스트링이 아닙니다.")
    if(!Number(salePrice.replace(/,/g, ''))) throw new SyntaxError("할인 가격이 올바른 숫자가 아닙니다.")
    if(Number(salePrice.replace(/,/g, '')) % 1 !== 0) throw new SyntaxError("할인 가격이 정수가 아닙니다.")
    if(Number(salePrice.replace(/,/g, '')) < 0) throw new SyntaxError("할인 가격이 음수입니다.")
    if(typeof link !== "string") throw new SyntaxError("링크가 스트링이 아닙니다.")
    if(typeof volume !=="string") throw new SyntaxError("책 권수가 스트링이 아닙니다.")
    if(!Number(volume.replace(/,/g, ''))) throw new SyntaxError("책 권수가 올바른 숫자가 아닙니다.")
    if(Number(volume.replace(/,/g, '')) % 1 !== 0) throw new SyntaxError("책 권수가 정수가 아닙니다.")
    if(Number(volume.replace(/,/g, '')) < 1) throw new SyntaxError("책 권수가 음수입니다.") 
    
    //ANCHOR format data
    if(!_id) _id = generateId();

    const book = Object.freeze({
      _id,
      title,
      author,
      salePrice,
      link,
      volume
    })
    return book;
  }
}
  function generateId(){
    const uuid = uuidv4();
    const id = uuid.replace(/-/g, "");
    return id;
  }