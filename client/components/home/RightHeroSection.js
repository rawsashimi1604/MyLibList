import React from "react";
import { TbDatabaseExport } from "react-icons/tb";

function RightHeroSection() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="rounded-[100%] border-8 p-20 mb-[100px] shadow-xl border-cyan-50 shadow-cyan-400 bg-cyan-900 animate__animated animate__fadeInUp animate__slower">
        <TbDatabaseExport className="w-80 h-80 text-white" />
      </div>
    </div>
  );
}

export default RightHeroSection;
