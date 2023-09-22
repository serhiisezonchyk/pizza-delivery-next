'use client';
import { useCartStore } from '@/store';
import { ProductType } from '@/types/types';
import React from 'react';
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();
  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const handleAddToCartClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
      ...(product.options?.length ? {
        optionTitle: product?.options[0].title,
      } : {
        optionTitle: 'Стандарт',
      }),
      quantity: 1,
    });
    toast.success('Товар додано в корзину');
  };

  return <button onClick={(e)=>handleAddToCartClick(e)}>До кошику</button>;
};

export default AddToCartButton;
