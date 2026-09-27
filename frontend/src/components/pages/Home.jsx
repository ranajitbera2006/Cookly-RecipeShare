import React from "react";
import Navbar from "../layouts/Navbar";
import WelcomeMessage from "../parts/WelcomeMessage";
import RecipeList from "../parts/RecipeList";
import Footer from "../layouts/Footer";
import NewsLetter from "../parts/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="text-white flex items-center justify-center flex-col w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 bg-background">
        <WelcomeMessage />
        <RecipeList />
        <NewsLetter />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
