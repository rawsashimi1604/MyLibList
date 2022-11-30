import React from "react";
import { TiTick } from "react-icons/ti";
import Button from "../buttons/Button";

function SuccessModal({ text, buttonText, buttonOnClick }) {
  return (
    <div
      tabindex="-1"
      className="flex bg-black/50 justify-center items-center fixed md:inset-0 h-screen w-screen text-black"
      style={{ zIndex: "1000" }}
    >
      <div className="flex flex-col relative p-4 max-w-md min-w-[500px]">
        <div className="flex justify-center bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center p-6">
            <TiTick className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 items-center">
              {text}
            </h3>
            <div
              className="flex items-center justify-center"
              onClick={buttonOnClick}
            >
              <Button text={buttonText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
