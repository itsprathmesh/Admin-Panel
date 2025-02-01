import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Ensure these are imported correctly
import { addToCart } from "../features/cartSlice"; // Correct import
import { motion } from "framer-motion"; // Importing Framer Motion

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Assuming you already have a selector to get products
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === parseInt(id));

  // If product is not found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Framer Motion Animation on the Image */}
          <motion.div
            className="flex flex-1 justify-center items-center mb-8 lg:mb-0"
            initial={{ opacity: 0, y: -50 }} // Initial state of the image (hidden and moved upwards)
            animate={{ opacity: 1, y: 0 }} // Final state of the image (fully visible and in place)
            transition={{ duration: 0.6 }} // Smooth transition
          >
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={image}
              alt={title}
            />
          </motion.div>

          {/* Framer Motion Animation on the Product Details */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }} // Initial state (hidden and slightly shifted to the right)
            animate={{ opacity: 1, x: 0 }} // Final state (fully visible and in place)
            transition={{ duration: 0.6 }} // Smooth transition
          >
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>

            {/* Framer Motion Animation on the Button */}
            <motion.button
              onClick={() => {
                console.log("Product being added:", product); // Debugging step
                dispatch(addToCart(product)); // Dispatch addToCart action
              }}
              className="cursor-pointer text-lg font-semibold py-2 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200"
              whileHover={{
                scale: 1.1, // Slightly scale the button on hover
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.9, // Scale the button slightly when clicked
                transition: { duration: 0.1 },
              }}
            >
              Add to cart
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
