import React from 'react';
import './Feature.scss';
import Image from 'next/image';
import { ProductType } from '@/types/types';
import Link from 'next/link';
import AddToCartButton from '../to-cart-button/AddToCartButton';
const getFeaturedProducts = async () => {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Помилка!');
  }
  return res.json();
};

const Feature = async () => {
  const featuredProducts: ProductType[] = await getFeaturedProducts();
  return (
    <div className='feature'>
      <div className='feature-wrapper'>
        {featuredProducts.map((item) => (
          <Link key={item.id} className='feature-item' href={`/product/${item.id}`}>
            {item.img && (
              <div className='feature-item-image'>
                <Image fill src={item.img} alt='/Image_not_available.png' />
              </div>
            )}
            <div className='feature-item-text'>
              <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
              <div className='flex flex-col gap-4'>
                <span>{item.price}</span>
                <AddToCartButton product={item}/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
