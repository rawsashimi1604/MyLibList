import httpService from "../httpService";

function getAllReadingLists() {
  return httpService.get("/readingList/all");
}

function addReadingList(body) {
  return httpService.post("/readingList/addReadingList", body)
}

function addBookToReadingList(body) {
  return httpService.post("/readingList/book", body)
}

function deleteBookFromReadingList(body) {
  return httpService.delete("/readingList/book", { data: body })
}

function getReadingList(reading_list_id) {
  return httpService.get("/readingList/" + reading_list_id);
} 


export default {
  getAllReadingLists,
  addReadingList,
  addBookToReadingList,
  getReadingList,
  deleteBookFromReadingList
};
