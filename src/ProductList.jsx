import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic House Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming scent, great for relaxation.", cost: "$18" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-66dd66223403", description: "Sweet fragrance, beautiful white flowers.", cost: "$20" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    const existingItem = cartItems.find(item => item.name === plant.name);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.name === plant.name ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...plant, quantity: 1 }]);
    }
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 <span>{calculateTotalQuantity()}</span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h1>{categoryObj.category}</h1>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div className="plant-card" key={pIndex}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button 
                      disabled={cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem cart={cartItems} setCart={setCartItems} onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
