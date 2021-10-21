import { v4 as uuidv4 } from "uuid"
// export default ({ title, author, salePrice, price = "" } = {}) => {
//   const book = Object.freeze({
//     title: title,
//     author: author,
//     salePrice: salePrice,
//     price: price,
//   });
//   return book;
// };
export default function buildBook({
    _id,
    title,
    author,
    publisher,
    salePrice,
    price
  }){
    //ANCHOR null checking
    if(!title) throw new Error("제목이 없습니다.")
    if(!author) throw new Error("작가가 없습니다.")
    // if(!publisher) throw new Error("출판사가 없습니다.")
    if(!salePrice) throw new Error("할인 가격이 없습니다.")

    // ANCHOR format checking
    if(typeof title !== "string") throw new SyntaxError("제목이 스트링이 아닙니다.")
    if(typeof author !== "string") throw new SyntaxError("작가가 스트링이 아닙니다.")
    // if(typeof publisher !== "string") throw new SyntaxError("출판사가 스트링이 아닙니다.")
    if(typeof salePrice !== "string") throw new SyntaxError("할인 가격이 스트링이 아닙니다.")
    if(Number(salePrice) < 1 || Number(salePrice) % 1 < 1) throw new SyntaxError("할인 가격이 자연수가 아닙니다.")
    
    //ANCHOR format data
    if(!_id) _id = generateId();

    const book = Object.freeze({
      _id,
      title,
      author,
      publisher,
      salePrice,
      price
    })
    return book;
  }
  function generateId(){
    const uuid = uuidv4();
    const id = uuid.replace(/-/g, "");
    return id;
  }