export default function validateBook(bookString){
    if (typeof bookString !== "string") return false;

    return true;
}