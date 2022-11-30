import React from "react";

function ErrorButton({ text }) {
  return (
    <button
      className="bg-red-500 active:bg-red-400 font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none text-white focus:outline-none mr-1 mb-1 transition-all duration-150 hover:scale-105 w-44"
      type="button"
    >
      {text}
    </button>
  );
}

export default ErrorButton;
