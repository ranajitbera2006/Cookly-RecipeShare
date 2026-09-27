import React from "react";
import TypingAnimation from "./TypingAnimation";
import { CiSearch } from "react-icons/ci";

const WelcomeMessage = () => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
        {" "}
        Welcome to{" "}
        <span className="font-serif italic text-amber-400"> Cookly </span>{" "}
      </h1>
      <TypingAnimation />
    </div>
  );
};

export default WelcomeMessage;
