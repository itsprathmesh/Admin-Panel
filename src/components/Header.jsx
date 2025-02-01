import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../features/sidebarSlice";
import { toggleTheme } from "../features/themeSlice"; // Import the toggleTheme action
import Logo from "../img/logo.jpg";
import { BsBag, BsHeart, BsHeartFill, BsSun, BsMoon } from "react-icons/bs"; // Add Sun and Moon icons for the toggle

const Header = () => {
  // Header state
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const itemAmount = useSelector((state) => state.cart.itemAmount);
  const wishlistAmount = useSelector((state) => state.wishlist.items.length); // Get wishlist count
  const theme = useSelector((state) => state.theme.theme); // Get the current theme

  // Event listener to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme between dark and light
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to toggle the theme
  };

  // Update body class when theme changes (for applying dark mode globally)
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark"); // Apply dark theme to body
    } else {
      document.body.classList.remove("dark"); // Remove dark theme
    }
  }, [theme]);
  return (
    <header
      className={`fixed w-full py-4 z-10 lg:px-8 md:px-4 px-4 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white shadow-lg" // Dark mode styles
          : isActive
          ? "bg-white text-black shadow-md" // Light mode when scrolled
          : "bg-transparent text-black" // Light mode default
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className="flex gap-4 items-center">
          {/* Admin Button */}
          <Link to="/admin">
            <div className="cursor-pointer text-lg font-semibold py-2 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200">
              Admin
            </div>
          </Link>

          {/* Dark/Light Mode Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className="cursor-pointer text-2xl p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            {theme === "dark" ? (
              <BsSun className="text-yellow-500" />
            ) : (
              <BsMoon className="text-gray-800" />
            )}
          </button>

          {/* Wishlist Button */}
          <Link to="/wishlist">
            <div className="cursor-pointer flex relative">
              <BsHeart
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } text-2xl`}
              />
              {wishlistAmount > 0 && (
                <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {wishlistAmount}
                </div>
              )}
            </div>
          </Link>

          {/* Cart Button */}
          <div
            onClick={() => dispatch(toggleSidebar())}
            className="cursor-pointer flex relative"
          >
            <BsBag
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } text-2xl`}
            />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
