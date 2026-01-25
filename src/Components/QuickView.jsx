import React from "react";
import { X, Heart } from "lucide-react";
import store from "../store";

const QuickView = ({ product, onClose }) => {
  const [cartState, setCartState] = React.useState(store.getState());

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  if (!product) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  const isInWishlist = cartState.wishlist.includes(product.id);

  const handleAddToCart = () => {
    store.dispatch({ type: "ADD_TO_CART", payload: product });
    onClose();
  };

  const handleToggleWishlist = () => {
    store.dispatch({ type: "TOGGLE_WISHLIST", payload: product.id });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            padding: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(102, 126, 234, 0.05)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(102, 126, 234, 0.1)",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#667eea",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {product.brand}
            </p>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                margin: "8px 0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {product.title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "12px",
                fontWeight: 600,
              }}
            >
              {product.category}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "16px 0",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{discountedPrice}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#9ca3af",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.price}
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "6px 12px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
                }}
              >
                {product.discountPercentage.toFixed(0)}% OFF
              </span>
            </div>

            <p
              style={{
                fontSize: "15px",
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#667eea",
              }}
            >
              ⭐ {product.rating} • {product.stock} in stock
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: "16px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 25px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 10px 35px rgba(102, 126, 234, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 6px 25px rgba(102, 126, 234, 0.4)";
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={handleToggleWishlist}
                style={{
                  padding: "16px",
                  background: isInWishlist
                    ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    : "#f3f4f6",
                  color: isInWishlist ? "#fff" : "#111827",
                  border: "none",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: isInWishlist
                    ? "0 6px 25px rgba(245, 87, 108, 0.4)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = isInWishlist
                    ? "0 10px 35px rgba(245, 87, 108, 0.6)"
                    : "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = isInWishlist
                    ? "0 6px 25px rgba(245, 87, 108, 0.4)"
                    : "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <Heart
                  size={22}
                  fill={isInWishlist ? "#fff" : "none"}
                  color={isInWishlist ? "#fff" : "#111827"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
