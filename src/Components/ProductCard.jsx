import React, { useState, useEffect, useRef } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import store from '../store';
import CartParticles from './CartParticles';

const ProductCard = ({ data, onQuickView }) => {
  const {
    id,
    title,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    thumbnail,
  } = data;

  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particlePos, setParticlePos] = useState({ x: 0, y: 0 });
  const [cartState, setCartState] = useState(store.getState());
  const cardRef = useRef(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2);
  const isInWishlist = cartState.wishlist.includes(id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setParticlePos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setShowParticles(true);
    store.dispatch({ type: 'ADD_TO_CART', payload: data });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    store.dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    onQuickView(data);
  };

  return (
    <>
      <Link 
        to={`/product/${id}`}
        className="product-card"
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="image-wrapper">
          <img src={thumbnail} alt={title} />
          <span className="discount-badge">
            {discountPercentage.toFixed(0)}% OFF
          </span>
          
          <button
            onClick={handleWishlist}
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          >
            <Heart 
              size={18} 
              fill={isInWishlist ? '#ef4444' : 'none'} 
              color={isInWishlist ? '#ef4444' : '#111827'} 
            />
          </button>
          
          <button
            onClick={handleQuickView}
            className="quick-view-btn"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          >
            <Eye size={16} /> Quick View
          </button>
        </div>

        <div className="product-info">
          <p className="brand">{brand}</p>
          <h3 className="title">{title}</h3>
          <p className="category">{category}</p>

          <div className="price-container">
            <span className="price">₹{discountedPrice}</span>
            <span className="original-price">₹{price}</span>
          </div>

          <div className="meta">
            <span>⭐ {rating}</span>
            <span>{stock} in stock</span>
          </div>

          <div className="tags">
            {tags?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <button onClick={handleAddToCart} className="add-btn">
            Add to Cart
          </button>
        </div>
      </Link>
      
      {showParticles && (
        <CartParticles
          x={particlePos.x}
          y={particlePos.y}
          onComplete={() => setShowParticles(false)}
        />
      )}
    </>
  );
};

export default ProductCard;