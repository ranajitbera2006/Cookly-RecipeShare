import React from "react";

const RecipeSkeleton = () => {
  return (
    <div className=" grid md:grid-cols-3 gap-3 m-3 xl:grid-cols-4 mx-5 sm:gap-6 mt-10">
      {Array.from(8).map((_, idx) => (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default RecipeSkeleton;
