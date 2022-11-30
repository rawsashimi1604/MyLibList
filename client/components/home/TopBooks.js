import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Book from "./Book";
import BookService from "../../requests/services/BookService";

function TopBooks() {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    getTopBooks();
  }, []);

  async function getTopBooks() {
    const res = await BookService.getTopBooks();
    setTopBooks(res.data.data);
  }

  return (
    <div className="">
      <Header text="Top Books in the Database" />

      {/* TOP BOOKS */}
      <section>
        {topBooks.length > 0 ? (
          <div>
            {topBooks.map((book, i) => {
              return <Book key={i} data={book} />;
            })}
          </div>
        ) : (
          <div>No books found</div>
        )}
      </section>
    </div>
  );
}

export default TopBooks;
