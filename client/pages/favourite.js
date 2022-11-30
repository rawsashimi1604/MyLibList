import React from "react";
import Header from "../components/common/Header";
import MainPageLayout from "../components/layout/MainPageLayout";
import LikedBooks from "../components/favouriteList/LikedBooks";

function Favourite() {
  return (
    <>
      <MainPageLayout>
        <Header text="Your Liked Books" />

        {/* Liked books */}
        <LikedBooks />
      </MainPageLayout>
    </>
  );
}

export default Favourite;
