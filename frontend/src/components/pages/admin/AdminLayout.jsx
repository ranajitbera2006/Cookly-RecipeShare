import React, { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { href, Link, Outlet, useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

import useLogout from "../../../hooks/useLogout";
import Footer from "../../layouts/Footer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/admin/listRecipe", label: "Recipe List" },
  { href: "/admin/addRecipe", label: "Add Recipe" },
];
const userLinks = [
  { href: "/admin/update-account", label: "Update Account" },
  { href: "/admin/delete-account", label: "Delete Account" },
];

const AdminLayout = () => {
  const { logOut } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20">
        <div
          className={`w-full fixed top-0 right-0 left-0 bg-background  z-20 py-3 `}
        >
          <div className="flex items-center justify-between px-2">
            <div
              className="flex items-center mr-2.5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/webLogo.png"
                alt="wedsitelogo"
                className="h-15 w-15"
              />
            </div>
            <div className="hidden md:flex items-center gap-1">
              <div className="glass-stronger bg-blue-950 rounded-full px-2 py-1 flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const isActive =
                    link.href === "/admin/listRecipe"
                      ? location.pathname === "/admin" ||
                        location.pathname === "/admin/listRecipe"
                      : location.pathname === link.href;
                  return (
                    <Link
                      to={link.href}
                      key={index}
                      className={`px-4 py-2   rounded-full hover:bg-surface hover:text-foreground ${isActive ? "text-foreground " : "text-muted-foreground"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="mr-2.5 hidden md:flex space-x-5 ">
              <div className="glass-stronger bg-blue-950 rounded-full px-2 py-1 flex items-center gap-1">
                {userLinks.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      to={link.href}
                      key={index}
                      className={`px-4 py-2   ${isActive ? "text-foreground " : "text-muted-foreground"} rounded-full hover:bg-surface hover:text-foreground `}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <button
                className="flex items-center bg-blue-600  px-3 rounded-full cursor-pointer hover:bg-blue-700 "
                onClick={() => logOut()}
              >
                <h3 className="font-bold text-white">Log out</h3>
                <MdOutlineLogout className="ml-1 text-white" />
              </button>
            </div>
            <div className="mr-2.5 md:hidden">
              <button
                className="flex items-center  py-2 px-3 rounded-full cursor-pointer "
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? (
                  <RxCross1 className="mr-1 text-white text-3xl" />
                ) : (
                  <IoMenuSharp className="mr-1 text-white text-3xl" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden glass-stronger animate-fade-in animate-fade-out left-0 right-0 absolute pt-16">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const isActive =
                  link.href === "/admin/listRecipe"
                    ? location.pathname === "/admin" ||
                      location.pathname === "/admin/listRecipe"
                    : location.pathname === link.href;
                return (
                  <Link
                    to={link.href}
                    key={index}
                    className={`text-lg ${isActive ? "text-foreground " : "text-muted-foreground"} hover:text-foreground py-2 `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {userLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    to={link.href}
                    key={index}
                    className={`text-lg ${isActive ? "text-foreground " : "text-muted-foreground"} hover:text-foreground py-2`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                className="flex items-center btn btn-primary justify-center"
                onClick={() => logOut()}
              >
                <MdOutlineLogout className="mr-1 text-white" />
                <h3 className="font-semibold text-white">Log out</h3>
              </button>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <div className="flex flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
