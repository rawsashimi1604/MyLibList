import React from "react";

function FullWidthButton({ text }) {
  return (
    <button
      className="block bg-cyan-500 active:bg-cyan-400 font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none text-white focus:outline-none mr-1 mb-1 transition-all duration-150 hover:scale-105 w-[100%]"
      type="button"
    >
      {text}
    </button>
  );
}

export default FullWidthButton;
