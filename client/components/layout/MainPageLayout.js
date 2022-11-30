import React from "react";

import useRedirectLogin from "../../hooks/useRedirectLogin";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function MainPageLayout({ children }) {
  // If not logged in ... redirect
  useRedirectLogin();

  return (
    <div className="font-Montserrat">
      <Navbar />
      <main className="px-10 py-8 pr-0 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default MainPageLayout;
