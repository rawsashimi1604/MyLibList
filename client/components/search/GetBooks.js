import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SmallHeader from "../common/SmallHeader"
import Book from "../favouriteList/Book";

function GetBooks({ books }) {

  return (
    <>
      <SmallHeader text="Search Results"/>

      {/* GET BOOKS */}
      <section className="flex flex-col gap-2">
        {books.length > 0 ? books?.map((book, i) => {
          return (
            <Book data={book} />
          );
        }) : <div>No books found...</div>}
      </section>
    </>
  );
}

export default GetBooks;
