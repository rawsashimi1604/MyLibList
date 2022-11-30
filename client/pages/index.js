import React from "react";
import MainPageLayout from "../components/layout/MainPageLayout";
import Hero from "../components/home/Hero";
import TopBooks from "../components/home/TopBooks";

function Index() {
  return (
    <>
      <MainPageLayout>
        <Hero />
        <TopBooks />
      </MainPageLayout>
    </>
  );
}

export default Index;
