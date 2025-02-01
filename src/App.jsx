import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Wishlist from "./pages/Wishlist";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
        <Sidebar />
        <ScrollToTopButton />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
