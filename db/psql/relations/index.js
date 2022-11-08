import UserRelation from "./user.js";
import RefreshTokenRelation from "./refresh_token.js";

import AlternativeTitlesRelation from "./alternative_titles.js";
import BookList from "./book_lists.js";
import BookContributors from "./books_contributors.js";
import BooksInCollections from "./books_in_collections.js";
import BooksLanguages from "./books_languages.js";
import BooksLCSH from "./books_lcsh.js";
import BooksPublishedBy from "./books_published_by.js";
import BooksSubjects from "./books_subjects.js";
import BooksUsersLikes from "./books_users_likes.js";
import BooksUsersStatus from "./books_users_status.js";
import Books from "./books.js";
import Collections from "./collections.js";
import Contributors from "./contributors.js";
import Languages from "./languages.js";
import LCSH from "./lcsh.js";
import Publishers from "./publishers.js";
import ReadingLists from "./reading_lists.js";
import Subjects from "./subjects.js";
import UsersBookmarks from "./users_bookmarks.js";


const user = UserRelation;
const refresh_token = RefreshTokenRelation;

const alternative_titles = AlternativeTitlesRelation;
const book_lists = BookList;
const books_contributors = BookContributors;
const books_in_collections = BooksInCollections;
const books_languages = BooksLanguages;
const books_lcsh = BooksLCSH;
const books_published_by = BooksPublishedBy;
const books_subjects = BooksSubjects;
const books_users_likes = BooksUsersLikes;
const books_users_status = BooksUsersStatus;
const books = Books;
const collections = Collections;
const contributors = Contributors;
const languages = Languages;
const lcsh = LCSH;
const publishers = Publishers;
const reading_lists = ReadingLists;
const subjects = Subjects;
const users_bookmarks = UsersBookmarks;

export default {
  user,
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
