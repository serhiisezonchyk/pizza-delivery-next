'use client';
import React from 'react';
import './Price.scss';
import { Product } from '@prisma/client';
import { ProductType } from '@/types/types';
import { useCartStore } from '@/store';
import { toast } from 'react-toastify';

const Price = ({ product }: { product: ProductType }) => {
  const [totalPrice, setTotalPrice] = React.useState(product.price);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedOption, setSelectedOption] = React.useState(0);

  const { addToCart } = useCartStore();
  React.useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])
  React.useEffect(() => {
    setTotalPrice(
      quantity *
        product.price *
        (product.options?.length
          ? product.options[selectedOption]?.additionalPrice
          : 1)
    );
  }, [quantity, selectedOption, product]);
  const handleAddToCartClick = () =>{
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length ? {
        optionTitle: product?.options[selectedOption].title,
      } : {
        optionTitle: 'Стандарт',
      }),
      quantity: quantity,
    })
    toast.success("Товар додано в корзину");
  }

  return (
    <div className='price-container'>
      <h2>{totalPrice}</h2>
      <div className='options-container'>
        {product.options?.map((option, index) => (
          <button
            onClick={() => setSelectedOption(index)}
            key={option.title}
            className={`${index === selectedOption ? 'active' : ''}`}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className='quantity-div'>
        <div className='quantity-container'>
          <span>Кількість</span>
          <div className='quantity-changer'>
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {'-'}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              {'+'}
            </button>
          </div>
        </div>
        <button
          className='to-cart-button'
          onClick={handleAddToCartClick}
        >
          До корзини
        </button>
      </div>
    </div>
  );
};

export default Price;
