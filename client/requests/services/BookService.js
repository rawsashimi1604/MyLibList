import httpService from "../httpService";

function searchBook(queryString) {
  return httpService.get("/book" + queryString)
}

function getTopBooks() {
  return httpService.get("/book/topBooks");
}

function getBookByUUID(book_uuid) {
  return httpService.get(`/book?book_uuid=` + String(book_uuid));
}

function addLikeToBook(body) {
  return httpService.post("/book/like", body);
}

export default {
  searchBook,
  getTopBooks,
  getBookByUUID,
  addLikeToBook,
};
