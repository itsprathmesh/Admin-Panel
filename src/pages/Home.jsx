import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { fetchProducts } from "../features/productSlice";
import { motion } from "framer-motion"; // Import Framer Motion
import { Helmet } from "react-helmet"; // Import React Helmet

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const exploreRef = useRef(null); // Create a reference for the Explore Products section

  useEffect(() => {
    // Dispatch the fetchProducts action when the component mounts
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  if (productStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  // Get only men's, women's clothing, and jewelry category
  // const filteredProducts = products.filter((item) => {
  //   return (
  //     item.category === "men's clothing" ||
  //     item.category === "women's clothing" ||
  //     item.category === "jewellery"
  //   );
  // });

  const scrollToProducts = () => {
    exploreRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      {/* SEO Optimization with React Helmet */}
      <Helmet>
        <title>Welcome to Store | Explore Your Perfect Item</title>
        <meta
          name="description"
          content="Discover your perfect product at our store! Shop men's, women's clothing, and jewelry."
        />
        <meta property="og:title" content="Explore Your Perfect Product" />
        <meta
          property="og:description"
          content="Your perfect item is waiting to be discovered. Explore our men's, women's clothing, and jewelry."
        />
        <meta property="og:type" content="website" />
        {/* Preloading important assets */}
        <link rel="preload" href="/path-to-critical-image.jpg" as="image" />
        <link rel="preload" href="/path-to-critical-script.js" as="script" />
      </Helmet>

      <section className="h-[500px] bg-hero bg-no-repeat bg-cover bg-center py-20">
        <div className="container mx-auto text-wrap flex-wrap flex justify-around h-full px-8">
          {/* text */}
          <div className="flex flex-col flex-wrap justify-center">
            <h1 className="uppercase text-wrap text-[30px] md:text-[55px] leading-[1.1] font-semibold mb-4 animate-text">
              Welcome to Store!!
              <br />
            </h1>
            <h3 className="font-semibold mb-4 text-wrap text-light text-[20px] animate-text">
              Your perfect item is waiting to be discovered!
            </h3>
            <button
              onClick={scrollToProducts} // Call the scrollToProducts function on click
              className="cursor-pointer font-semibold py-3 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200 w-fit"
            >
              Explore Products
            </button>
          </div>
        </div>
      </section>
      <section className="py-16" ref={exploreRef}>
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>

          {/* Add motion.div for staggered animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2, // Delay between children animations
                },
              },
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Product product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
