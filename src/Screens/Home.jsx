import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import ProductGrid from "../Components/ProductGrid";
import CartSidebar from "../Components/CartSidebar";
import QuickView from "../Components/QuickView";

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <ProductGrid onQuickView={setQuickViewProduct} />
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
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