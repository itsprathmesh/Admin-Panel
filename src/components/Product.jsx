import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { deleteProduct } from "../features/productSlice";
import { motion } from "framer-motion";

const Product = ({ product, isAdmin = false, handleModal }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ✅ Detect if the device is mobile
  const [isMobile, setIsMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Run on mount
    window.addEventListener("resize", checkMobile); // Update on resize
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleOptions = (e) => {
    if (isMobile) {
      e.stopPropagation();
      setShowOptions((prev) => !prev);
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteProduct(id));
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <motion.div
      className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition flex flex-col h-[330px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={toggleOptions} // ✅ Clicking toggles options only on mobile
    >
      <div className="p-4">
        <div className="h-[200px] w-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>

        <div>
          <div className="text-sm capitalize mb-1">{product.category}</div>
          <Link to={`/product/${product.id}`}>
            <h2 className="font-semibold mb-1 text-height2">{product.title}</h2>
          </Link>
          <h2 className="font-semibold">$ {product.price}</h2>
        </div>

        {/* ✅ Hover for Desktop, Click for Mobile */}
        <div
          className={`absolute top-6 right-5 ${
            isMobile
              ? showOptions
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          } p-2 flex flex-col justify-center items-center gap-y-2 transition-all duration-300`}
        >
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleModal(product);
              }}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                <MdEdit className="text-3xl" />
              </div>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(product.id);
              }}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                <MdDelete className="text-3xl" />
              </div>
            </button>
          )}

          {!isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
              }}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                <BsPlus className="text-3xl" />
              </div>
            </button>
          )}

          {!isAdmin && (
            <Link
              to={`/product/${product.id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <BsEyeFill />
            </Link>
          )}

          {!isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                isInWishlist
                  ? dispatch(removeFromWishlist(product.id))
                  : dispatch(addToWishlist(product));
              }}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                {isInWishlist ? (
                  <BsHeartFill className="text-3xl" />
                ) : (
                  <BsHeart className="text-3xl" />
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
