import React from "react";

function SubPageLayout({ children }) {
  return (
    <section className="h-full gradient-form bg-gray-200 lg:h-screen font-Montserrat">
      <div className="mx-24 py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubPageLayout;
