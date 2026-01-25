import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import ProductGrid from "../Components/ProductGrid";
import CartSidebar from "../Components/CartSidebar";
import WishlistSidebar from "../Components/WishListSidebar";
import QuickView from "../Components/QuickView";

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products for wishlist display
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100",
        );
        const data = await response.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
      />
      <ProductGrid onQuickView={setQuickViewProduct} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Wishlist Sidebar */}
      <WishlistSidebar
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        allProducts={allProducts}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
