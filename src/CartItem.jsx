import React from 'react';
import './CartItem.css';

const CartItem = ({ cart, setCart, onContinueShopping }) => {

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
    setCart(cart.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      setCart(cart.map(i => i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    setCart(cart.filter(i => i.name !== item.name));
  };

  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return costNumber * item.quantity;
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-btn" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
