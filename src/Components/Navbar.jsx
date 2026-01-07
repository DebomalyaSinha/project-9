import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import store from "../store";

const Navbar = ({ onCartOpen }) => {
  const [cartState, setCartState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  const cartCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Nova Shop
      </Link>
      <SearchBar />

      <div className="navbar-right">
        <button className="cart" onClick={onCartOpen}>
          <ShoppingCart size={20} />
          <span className="cart-text">Cart</span>
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;