import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../features/productSlice"; // Import the actions
import { selectCategories } from "../features/productSlice"; // Import selectCategories

function AddProduct({ setIsOpen, product = null }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get current theme
  const apiCategories = useSelector(selectCategories); // Get categories from Redux state

  // Default categories + API categories (avoiding duplicates)
  const categories = Array.from(
    new Set([
      "electronics",
      "men's clothing",
      "women's clothing",
      "jewelery",
      ...apiCategories,
    ])
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(categories[0]); // Default to first category
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = () => {
    if (!title || !price || !description || !image) {
      setError("Please fill in all fields.");
      return;
    }

    const newProduct = { title, price, description, image, category };

    if (product) {
      dispatch(updateProduct({ ...newProduct, id: product.id }));
    } else {
      dispatch(addProduct(newProduct));
    }

    setIsOpen(false);
    setError("");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md transition-all duration-300 z-50">
      <div
        className={`w-96 p-6 shadow-lg rounded-lg transition-all duration-300 ${
          theme === "dark" ? "bg-gray-200 text-white" : "bg-white text-black"
        }`}
      >
        <h4 className="uppercase font-semibold mb-4 text-center">
          {product ? "Update Product" : "Add Product"}
        </h4>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Form Fields */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`p-2 border rounded mb-4 w-full ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className={`p-2 border rounded mb-4 w-full ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className={`p-2 border rounded mb-4 w-full ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className={`p-2 border rounded mb-4 w-full ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`p-2 border rounded mb-4 w-full ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="cursor-pointer text-lg font-semibold py-2 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200"
          >
            {product ? "Update" : "Add"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-lg font-semibold py-2 px-6 bg-gray-700 hover:bg-gray-600 shadow-md text-white rounded-full transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
