import Link from 'next/link';
import React from 'react';

const AddToCartNotification = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="add-to-cart-notification">
      <p>Item has been added to cart!</p>
      <Link href="/cart">See cart</Link>
      <button onClick={() => setIsCartVisible(false)}>Close</button>
    </div>
  );
};

export default AddToCartNotification;
