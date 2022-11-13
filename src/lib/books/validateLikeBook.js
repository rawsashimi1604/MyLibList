export default function validateBook(likeBookObj){
    if (typeof likeBookObj !== "object") return false;

    return true;
}