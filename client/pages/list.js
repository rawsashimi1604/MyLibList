import React, { useState } from "react";

import Header from "../components/common/Header";
import MainPageLayout from "../components/layout/MainPageLayout";
import MyReadingList from "../components/readingList/MyReadingList";
import AllReadingLists from "../components/readingList/AllReadingLists";
import AddReadingList from "../components/readingList/AddReadingList";

function List() {
  const [menuItem, setMenuItem] = useState(0);

  function renderMenuItem() {
    switch (menuItem) {
      case 0:
        return <MyReadingList />;
      case 1:
        return <AllReadingLists />;
      case 2:
        return <AddReadingList />;
    }
  }

  return (
    <>
      <MainPageLayout>
        <Header text="Reading Lists " />

        <div className="inline-flex text-xl bg-cyan-100 rounded-lg py-4 px-2 shadow-md shadow-gray-500">
          <div
            onClick={() => setMenuItem(0)}
            className={`cursor-pointer border-r-[1px] border-r-black px-4`}
          >
            <div
              className={`pb-2 ${
                menuItem === 0 &&
                "font-semibold border-b-[1px] border-cyan-600 "
              }`}
            >
              My Reading Lists
            </div>
          </div>

          <div
            onClick={() => setMenuItem(1)}
            className={`cursor-pointer border-r-[1px] border-r-black px-4`}
          >
            <div
              className={`pb-2 ${
                menuItem === 1 &&
                "font-semibold border-b-[1px] border-cyan-600 "
              }`}
            >
              All Reading Lists
            </div>
          </div>

          <div onClick={() => setMenuItem(2)} className={`cursor-pointer px-4`}>
            <div
              className={`pb-2 ${
                menuItem === 2 &&
                "font-semibold border-b-[1px] border-cyan-600 "
              }`}
            >
              Add Reading Lists
            </div>
          </div>
        </div>

        <section className="mt-8">{renderMenuItem()}</section>
      </MainPageLayout>
    </>
  );
}

export default List;
