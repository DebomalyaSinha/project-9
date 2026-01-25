import React, { useState, useEffect } from "react";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import store from "../store";

const WishlistSidebar = ({ isOpen, onClose, allProducts }) => {
  const [cartState, setCartState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  // Filter products that are in the wishlist
  const wishlistItems = allProducts.filter((product) =>
    cartState.wishlist.includes(product.id),
  );

  const handleRemoveFromWishlist = (productId) => {
    store.dispatch({ type: "TOGGLE_WISHLIST", payload: productId });
  };

  const handleAddToCart = (product) => {
    store.dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">My Wishlist ({wishlistItems.length})</h2>
          <button onClick={onClose} className="cart-close">
            <X size={24} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="cart-items">
          {wishlistItems.length === 0 ? (
            <div className="cart-empty">
              <Heart
                size={48}
                style={{ margin: "0 auto 16px", opacity: 0.3 }}
              />
              <p>Your wishlist is empty</p>
            </div>
          ) : (
            wishlistItems.map((item) => {
              const price = (
                item.price -
                (item.price * item.discountPercentage) / 100
              ).toFixed(2);
              return (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.id}`} onClick={onClose}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </Link>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`} onClick={onClose}>
                      <h3 className="cart-item-title">{item.title}</h3>
                    </Link>
                    <p className="cart-item-price">₹{price}</p>
                    <p className="cart-item-rating">⭐ {item.rating}</p>

                    <div className="cart-item-actions">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="add-cart"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="remove-btn"
                      >
                        <Heart size={16} fill="#ef4444" color="#ef4444" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
