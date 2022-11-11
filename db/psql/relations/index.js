import UserRelation from "./users.js";
import RefreshTokenRelation from "./refresh_token.js";
import AlternativeTitlesRelation from "./alternative_titles.js";
import BookListRelation from "./book_lists.js";
import BookContributorsRelation from "./books_contributors.js";
import BooksInCollectionsRelation from "./books_in_collections.js";
import BooksLanguagesRelation from "./books_languages.js";
import BooksLCSHRelation from "./books_lcsh.js";
import BooksPublishedByRelation from "./books_published_by.js";
import BooksSubjectsRelation from "./books_subjects.js";
import BooksUsersLikesRelation from "./books_users_likes.js";
import BooksUsersStatusRelation from "./books_users_status.js";
import BooksRelation from "./books.js";
import CollectionsRelation from "./collections.js";
import ContributorsRelation from "./contributors.js";
import LanguagesRelation from "./languages.js";
import LCSHRelation from "./lcsh.js";
import PublishersRelation from "./publishers.js";
import ReadingListsRelation from "./reading_lists.js";
import SubjectsRelation from "./subjects.js";
import UsersBookmarksRelation from "./users_bookmarks.js";

const users = UserRelation;
const refresh_token = RefreshTokenRelation;

const alternative_titles = AlternativeTitlesRelation;
const book_lists = BookListRelation;
const books_contributors = BookContributorsRelation;
const books_in_collections = BooksInCollectionsRelation;
const books_languages = BooksLanguagesRelation;
const books_lcsh = BooksLCSHRelation;
const books_published_by = BooksPublishedByRelation;
const books_subjects = BooksSubjectsRelation;
const books_users_likes = BooksUsersLikesRelation;
const books_users_status = BooksUsersStatusRelation;
const books = BooksRelation;
const collections = CollectionsRelation;
const contributors = ContributorsRelation;
const languages = LanguagesRelation;
const lcsh = LCSHRelation;
const publishers = PublishersRelation;
const reading_lists = ReadingListsRelation;
const subjects = SubjectsRelation;
const users_bookmarks = UsersBookmarksRelation;

export default {
  users,
  refresh_token,
  alternative_titles,
  book_lists,
  books_contributors,
  books_in_collections,
  books_languages,
  books_lcsh,
  books_published_by,
  books_subjects,
  books_users_likes,
  books_users_status,
  books,
  collections,
  contributors,
  languages,
  lcsh,
  publishers,
  reading_lists,
  subjects,
  users_bookmarks,
};
