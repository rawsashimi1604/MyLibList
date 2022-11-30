import React, { useState, useEffect } from "react";
import UserService from "../../requests/services/UserService";
import useLocalStorage from "../../hooks/useLocalStorage";
import Book from "./Book";

function LikedBooks() {
  // States
  const [user, setUser] = useLocalStorage("user", null);
  const [likedBooks, setLikedBooks] = useState([]);

  // Use Effects
  useEffect(() => {
    getLikedBooks();
  }, []);

  // Functions
  async function getLikedBooks() {
    try {
      const res = await UserService.getAllLikedBooks({
        email: user.data.email,
      });
      console.log(res);
      setLikedBooks(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {likedBooks.length > 0 ? (
        likedBooks.map((book, i) => {
          return (
            <div>
              <Book data={book} />
            </div>
          );
        })
      ) : (
        <div>You haven't add any books to your favorites yet. Please click on the thumbs up button displayed in the books detail page to see them here.</div>
      )}
    </>
  );
}

export default LikedBooks;
