import UserRelation from "./users.js";
import RefreshTokenRelation from "./refresh_token.js";
import BooksRelation from "./books.js";
import ReadingListsRelation from "./reading_lists.js";

const users = UserRelation;
const refresh_token = RefreshTokenRelation;
const books = BooksRelation;
const reading_lists = ReadingListsRelation;

export default {
  users,
  refresh_token,
  reading_lists,
  books
};
