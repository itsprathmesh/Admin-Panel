import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/productSlice"; // Import the action

function AddCategory({ setIsOpen }) {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    // Dispatch action to add category
    dispatch(addCategory(categoryName));
    setIsOpen(false); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md transition-all duration-300 z-50">
      <div className="w-96 p-6 shadow-lg rounded-lg bg-white text-black">
        <h4 className="uppercase font-semibold mb-4 text-center">
          Add New Category
        </h4>

        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="New Category"
          className="p-2 border rounded mb-4 w-full"
        />

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="cursor-pointer text-lg font-semibold py-2 px-6 bg-blue-950 hover:bg-blue-800 shadow-md text-white rounded-full transition-all duration-200"
          >
            Add
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

export default AddCategory;
