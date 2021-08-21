export default function buildBook() {
    return ({
        title,
        author,
        salePrice,
        price = ''
    }={})=>{
        const book = Object.freeze({
            title: title,
            author: author,
            salePrice: salePrice,
            price: price
        })
        return book;
    }
}