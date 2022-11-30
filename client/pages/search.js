import React, { useState } from "react";
import MainPageLayout from "../components/layout/MainPageLayout";
import InputSection from "../components/search/InputSection";
import GetBooks from "../components/search/GetBooks";

function Search() {

  const [books, setBooks] = useState([]);

  return (
    <>
      <MainPageLayout>
        <InputSection setBooks={setBooks}/>
        <div className="mb-10"></div>
        <GetBooks books={books}/>
      </MainPageLayout>
    </>
  );
}

export default Search;
