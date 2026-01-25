import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CartSidebar from "../Components/CartSidebar";
import WishlistSidebar from "../Components/WishListSidebar";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import store from "../store";

const Pdp = () => {
  let [pdpData, setPdpData] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [cartState, setCartState] = useState(store.getState());
  let { id } = useParams();

  async function getData() {
    let data = await fetch(`https://dummyjson.com/products/${id}`);
    let jsonData = await data.json();
    setPdpData(jsonData);
  }

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

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getData();
  }, [id]);

  const handleAddToCart = () => {
    if (pdpData) {
      store.dispatch({ type: "ADD_TO_CART", payload: pdpData });
    }
  };

  const handleToggleWishlist = () => {
    if (pdpData) {
      store.dispatch({ type: "TOGGLE_WISHLIST", payload: pdpData.id });
    }
  };

  const isInWishlist = pdpData
    ? cartState.wishlist.includes(pdpData.id)
    : false;

  if (!pdpData) {
    return (
      <div>
        <Navbar
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
        />
        <div className="pdp-loading">Loading product...</div>
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <WishlistSidebar
          isOpen={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          allProducts={allProducts}
        />
      </div>
    );
  }

  const discountedPrice = (
    pdpData.price -
    (pdpData.price * pdpData.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div>
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
      />

      <div className="pdp-container">
        {/* LEFT IMAGE SECTION */}
        <div className="pdp-image-section">
          <img src={pdpData.thumbnail} alt={pdpData.title} />
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="pdp-details">
          <p className="pdp-brand">{pdpData.brand}</p>
          <h1 className="pdp-title">{pdpData.title}</h1>
          <p className="pdp-category">{pdpData.category}</p>

          <div className="pdp-rating">
            ⭐ {pdpData.rating} <span>({pdpData.stock} in stock)</span>
          </div>

          <div className="pdp-price">
            <span className="discounted">₹{discountedPrice}</span>
            <span className="original">₹{pdpData.price}</span>
            <span className="offer">
              {pdpData.discountPercentage.toFixed(0)}% OFF
            </span>
          </div>

          <p className="pdp-description">{pdpData.description}</p>

          <div className="pdp-tags">
            {pdpData.tags?.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>

          <div className="pdp-actions">
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-pdp-btn ${isInWishlist ? "active" : ""}`}
              onClick={handleToggleWishlist}
            >
              <Heart
                size={22}
                fill={isInWishlist ? "#ef4444" : "none"}
                color={isInWishlist ? "#ef4444" : "#111827"}
              />
            </button>
            <button className="buy-now">Buy Now</button>
          </div>

          <div className="pdp-info">
            <p>🚚 {pdpData.shippingInformation}</p>
            <p>🛡 {pdpData.warrantyInformation}</p>
            <p>↩ {pdpData.returnPolicy}</p>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Wishlist Sidebar */}
      <WishlistSidebar
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        allProducts={allProducts}
      />
    </div>
  );
};

export default Pdp;
