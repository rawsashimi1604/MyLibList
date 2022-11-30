import React from "react";

function RoundedButton({ text }) {
  return (
    <button
      className="bg-cyan-500 active:bg-cyan-400 font-bold uppercase text-sm px-6 py-3 shadow-xl shadow-slate-300 outline-none text-white focus:outline-none mr-1 mb-1 transition-all duration-150 hover:scale-105 hover:translate-x-2 rounded-[100px] font-Raleway tracking-widest"
      type="button"
    >
      {text}
    </button>
  );
}

export default RoundedButton;
