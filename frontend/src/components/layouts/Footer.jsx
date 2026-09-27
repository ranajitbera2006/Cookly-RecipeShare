import React from "react";
import { footerLinks, legal, socialLinks } from "../../assets/links.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/webLogo.png"
                alt="Cookly logo"
                className="h-14 w-14 object-contain"
              />

              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Cookly
                </h2>
                <p className="text-xs tracking-widest text-emerald-400">
                  SHARE • COOK • INSPIRE
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">
              Discover delicious recipes, share your favorite dishes, and
              connect with a community of food lovers.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${item.title || "social media"}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full
                      border border-zinc-800 bg-zinc-900 text-zinc-400
                      transition-all duration-200
                      hover:border-emerald-500/40
                      hover:bg-emerald-500/10
                      hover:text-emerald-400"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((item, idx) => (
            <div key={idx}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {item.title}
              </h3>

              <ul className="space-y-3">
                {item.links.map((link, id) => (
                  <li key={id}>
                    <Link
                      to={link.href}
                      className="text-sm text-zinc-500 transition-colors duration-200
                        hover:text-emerald-400"
                    >
                      {link.itm}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div
          className="mt-12 flex flex-col gap-5 rounded-2xl border border-zinc-800
          bg-zinc-900/50 p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-semibold text-white">
              Have a recipe to share?
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Your next favorite recipe might come from you.
            </p>
          </div>

          <Link
            to="/admin/addRecipe"
            className="inline-flex w-fit items-center justify-center rounded-xl
              bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950
              transition-all duration-200
              hover:bg-amber-300
              hover:shadow-lg hover:shadow-amber-400/10"
          >
            Share Your Recipe
          </Link>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 flex flex-col gap-4 border-t border-zinc-800 pt-6
          text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-zinc-600">
            © {new Date().getFullYear()} Cookly. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className="text-zinc-600 transition-colors
                  hover:text-zinc-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
