"use client"
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './CartIcon.scss'
import { useCartStore } from '@/store';

const CartIcon = () => {
  const { quantity } = useCartStore();
  React.useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])
  return (
    <div className='cart-link'>
      <AiOutlineShoppingCart />
      <span>Кошик ({quantity})</span>
    </div>
  );
};

export default CartIcon;
