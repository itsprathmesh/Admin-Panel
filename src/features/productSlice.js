import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load products from local storage
const loadProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

// Save products to local storage
const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

// Load categories from local storage
const loadCategoriesFromLocalStorage = () => {
  const storedCategories = localStorage.getItem("categories");
  return storedCategories
    ? JSON.parse(storedCategories)
    : ["electronics", "men's clothing", "women's clothing", "jewelery"]; // Default categories if none found
};

// Save categories to local storage
const saveCategoriesToLocalStorage = (categories) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

// Fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState();
    if (state.products.items.length === 0) {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      saveProductsToLocalStorage(data); // Save fetched products to localStorage
      return data;
    }
    return state.products.items; // Return the products from state if available
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: loadProductsFromLocalStorage(), // Load products from local storage
    categories: loadCategoriesFromLocalStorage(), // Load categories from local storage
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.items.push(newProduct);
      saveProductsToLocalStorage(state.items); // Save to local storage
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.items = state.items.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      saveProductsToLocalStorage(state.items); // Save updates to local storage
    },

    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(state.items); // Save to local storage
    },

    addCategory: (state, action) => {
      state.categories.push(action.payload); // Add new category
      saveCategoriesToLocalStorage(state.categories); // Save updated categories to local storage
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        saveProductsToLocalStorage(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector for categories
export const selectCategories = (state) => state.products.categories;

export const { addProduct, updateProduct, deleteProduct, addCategory } =
  productSlice.actions;
export default productSlice.reducer;
