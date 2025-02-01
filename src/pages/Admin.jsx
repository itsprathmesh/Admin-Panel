import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { fetchProducts } from "../features/productSlice";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory"; // Import AddCategory
import { Helmet } from "react-helmet";

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State for category modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleAddNewCategory = () => {
    setIsCategoryModalOpen(true); // Open AddCategory modal
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  if (productStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard | Manage Your Products</title>
        <meta
          name="description"
          content="Admin dashboard to manage your products. Add, edit, and view the products available in the store."
        />
        <meta property="og:title" content="Admin Dashboard" />
        <meta
          property="og:description"
          content="Manage your store's products, add new ones, and edit or remove them."
        />
        <meta property="og:type" content="website" />
        <link rel="preload" href="/path-to-critical-image.jpg" as="image" />
      </Helmet>

      <section className="h-[450px] bg-hero bg-no-repeat bg-cover bg-center py-20">
        <div className="container mx-auto flex justify-around h-full">
          <div className="flex flex-col justify-center ">
            <h1 className="uppercase md:text-[35px] leading-[1.1] font-semibold mb-5 animate-text">
              Manage Your Products & Categories
            </h1>
            <div className="flex space-x-4">
              {/* Add Product Button */}
              <button
                onClick={handleAddNewProduct}
                className="cursor-pointer text-lg font-semibold py-2 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200"
              >
                Add Product
              </button>

              {/* Add Category Button */}
              <button
                onClick={handleAddNewCategory}
                className="cursor-pointer text-lg font-semibold py-2 px-6 bg-green-950 hover:bg-green-800 shadow-md text-white rounded-full transition-all duration-200"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Product Modal */}
      {isProductModalOpen && (
        <AddProduct
          setIsOpen={setIsProductModalOpen}
          product={selectedProduct}
        />
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <AddCategory setIsOpen={setIsCategoryModalOpen} />
      )}

      <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            isAdmin={true}
            handleModal={handleEditProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
