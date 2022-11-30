import httpService from "../httpService";

function registerUser(body) {
  return httpService.post("/user", body);
}

function getAllUsers() {
  return httpService.get("/user");
}

function getAllLikedBooks(body) {
  return httpService.post("/user/likedBooks", body);
}

function getAllReadingLists(body) {
  return httpService.post("/user/readingLists", body);
}

function changeUserPassword(body) {
  return httpService.put("/user/changePassword", body);
}

export default {
  registerUser,
  getAllUsers,
  getAllLikedBooks, 
  getAllReadingLists,
  changeUserPassword
}
