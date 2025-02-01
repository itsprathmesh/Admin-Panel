import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // ✅ Import React Helmet for SEO
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/sidebarSlice";
import { removeFromCart } from "../features/cartSlice";
import CartItem from "../components/CartItem";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
  };

  return (
    <>
      {/* SEO Optimization with React Helmet */}
      <Helmet>
        <title>Shopping Bag | Your Cart</title>
        <meta
          name="description"
          content="View and manage items in your shopping bag."
        />
      </Helmet>

      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        } w-full fixed top-0 h-full transition-all duration-300 z-20 px-4 lg:px-[35px] ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <h2 className="text-xl font-semibold">
            Shopping Bag ({cartItems.length})
          </h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="text-lg font-bold"
          >
            <IoMdArrowForward className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col gap-y-2 h-[500px] overflow-y-auto border-b">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <p className="text-gray-500 mt-4">Your cart is empty</p>
          )}
        </div>

        <div className="flex flex-col gap-y-3 mt-4">
          <div className="flex justify-between items-center">
            <div className="font-semibold">
              <span className="mr-2">Subtotal:</span> ${total.toFixed(2)}
            </div>
            <button
              onClick={handleClearCart}
              className="py-2 px-4 bg-red-500 text-white rounded-lg"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`absolute bottom-6 right-6 py-2 px-4 rounded-lg ${
            isDarkMode ? "bg-yellow-500" : "bg-gray-700"
          } text-white`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
