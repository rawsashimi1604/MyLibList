import React from "react";

function RightSection() {
  return (
    <div className="lg:w-[50%] flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none pb-12 lg:pb-0 bg-cyan-900">
      <div className="text-white px-4 py-6 md:p-12">
        <div className="flex lg:justify-center items-center lg:mx-14 py-3.5 rounded-lg mb-8"></div>
        <h4 className="text-xl font-semibold mb-6 font-mono">
          The best book companion you will need.
        </h4>

        <br></br>
        <p className="text-sm font-mono">
          This web application allows users to view, read and like books from the National Library Board, Singapore.
        </p>
      </div>
    </div>
  );
}

export default RightSection;
