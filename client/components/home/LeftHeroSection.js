import React from "react";
import Link from "next/link";
import RoundedButton from "../common/buttons/RoundedButton";

function LeftHeroSection() {
  return (
    <div className="w-[50%] flex items-center">
      <div className="mb-[160px]">
        {/* HEADLINE */}
        <h1 className="font-bold text-8xl text-cyan-800 animate__animated animate__fadeInUp animate__delay">
          BIGGEST COLLECTION OF BOOKS{" "}
        </h1>
        <h1 className="font-light text-8xl mb-5 text-cyan-700 animate__animated animate__fadeInUp animate__delay-1s">
          IN SINGAPORE
        </h1>

        {/* SUBTITLE */}
        <h2 className="text-lg mb-8 animate__animated animate__fadeInUp animate__dela">
          Your <b>No. 1</b> digital book companion in Singapore to track, like and read thousands of books from the <b>National Library Board, Singapore</b>.
        </h2>

        {/* Button */}
        <Link href="/search">
          <div>
            <RoundedButton text="Search for books" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LeftHeroSection;
