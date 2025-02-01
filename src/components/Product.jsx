import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { addToCart } from "../features/cartSlice"; // Import the addToCart action
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice"; // Wishlist actions
import { deleteProduct } from "../features/productSlice"; // Import delete action
import { motion } from "framer-motion"; // Import Framer Motion

const Product = ({ product, isAdmin = false, handleModal }) => {
  const dispatch = useDispatch();

  // Get the current wishlist from Redux
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Delete Product and Update Local Storage
  const handleRemove = (id) => {
    dispatch(deleteProduct(id));

    // Update Local Storage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  // Add to Wishlist
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  // Remove from Wishlist
  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id)); //  Pass only the ID
  };

  return (
    <motion.div
      className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition flex flex-col h-[330px]"
      initial={{ opacity: 0, y: 20 }} // Initial state (invisible and slightly below)
      animate={{ opacity: 1, y: 0 }} // Final state (fully visible and in place)
      transition={{ duration: 0.5 }} // Animation duration
    >
      <div className="p-4">
        <div className=" h-[200px] w-full flex justify-center items-center">
          {/* Image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>
        {/* Category, Title & Price */}
        <div>
          <div className="text-sm capitalize mb-1">{product.category}</div>
          <Link to={`/product/${product.id}`}>
            <h2 className="font-semibold mb-1 text-height2">{product.title}</h2>
          </Link>
          <h2 className="font-semibold">$ {product.price}</h2>
        </div>

        {/* Buttons for Admin & User */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {isAdmin && (
            <button onClick={() => handleModal(product)}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                <MdEdit className="text-3xl" />
              </div>
            </button>
          )}

          {isAdmin && (
            <button onClick={() => handleRemove(product.id)}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                <MdDelete className="text-3xl" />
              </div>
            </button>
          )}

          {!isAdmin && (
            <button onClick={() => dispatch(addToCart(product))}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                <BsPlus className="text-3xl" />
              </div>
            </button>
          )}

          {!isAdmin && (
            <Link
              to={`/product/${product.id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          )}

          {/* Wishlist Icon for Users */}
          {!isAdmin && (
            <button
              onClick={() =>
                isInWishlist
                  ? handleRemoveFromWishlist(product.id)
                  : handleAddToWishlist(product)
              }
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
