import React from "react";
import MainPageLayout from "../components/layout/MainPageLayout";
import TopBooks from "../components/home/TopBooks";

function Book() {
  return (
    <>
      <MainPageLayout>
        <TopBooks />
      </MainPageLayout>
    </>
  );
}

export default Book;
