export default function validateBookmark(bookmarkObj){
    if (typeof bookmarkObj !== "object") return false;

    return true;
}