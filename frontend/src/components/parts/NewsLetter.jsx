import React from "react";

const NewsLetter = () => {
  return (
    <section className="mx-5 my-16 sm:mx-8 lg:mx-auto lg:max-w-4xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 px-6 py-10 text-center sm:px-10">
        <div className="mb-4 text-3xl">🍳</div>

        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          Good Food, Great Stories
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Discover delicious recipes, share your culinary ideas, and get
          inspired by a community that believes every recipe has a story.
        </p>

        <p className="mt-5 text-sm font-medium text-emerald-400">
          Cook. Share. Inspire. ✨
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
