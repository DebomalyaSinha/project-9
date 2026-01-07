import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import store from '../store';

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartState, setCartState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState(store.getState());
    });
    return unsubscribe;
  }, []);

  const total = cartState.items.reduce((sum, item) => {
    const price = item.price - (item.price * item.discountPercentage) / 100;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            Shopping Cart ({cartState.items.length})
          </h2>
          <button onClick={onClose} className="cart-close">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cartState.items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartState.items.map(item => {
              const price = (item.price - (item.price * item.discountPercentage) / 100).toFixed(2);
              return (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">₹{price}</p>
                    
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => store.dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity - 1 }
                          })}
                          className="quantity-btn"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => store.dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 }
                          })}
                          className="quantity-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => store.dispatch({ 
                          type: 'REMOVE_FROM_CART', 
                          payload: item.id 
                        })}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartState.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">₹{total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;