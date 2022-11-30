import React from "react";
import LeftHeroSection from "./LeftHeroSection";
import RightHeroSection from "./RightHeroSection";

function Hero() {
  return (
    <div className="flex h-screen w-full">
      <LeftHeroSection />
      <RightHeroSection />
    </div>
  );
}

export default Hero;
