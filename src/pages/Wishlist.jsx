import React from "react";
import { Helmet } from "react-helmet"; //Importing React Helmet for SEO
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io"; //Fix: Import the missing icon
import Product from "../components/Product";
import { removeFromWishlist } from "../features/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      {/* SEO Optimization with React Helmet */}
      <Helmet>
        <title>Wishlist | Your Favorite Products</title>
        <meta
          name="description"
          content="View and manage your wishlist items."
        />
        <meta property="og:title" content="Your Wishlist" />
        <meta
          property="og:description"
          content="Check out the products you saved in your wishlist!"
        />
        <meta property="og:type" content="website" />
        {/* Preloading important assets for better performance */}
        {/* <link rel="preload" as="image" href="/path-to-critical-image.jpg" />
        <link rel="preload" as="script" href="/path-to-critical-script.js" /> */}
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Your Wishlist
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((product) => (
                <div key={product.id} className="relative">
                  <Product product={product} />
                  <div
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <IoMdClose size={24} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center d-flex align-center">Your wishlist is empty.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
