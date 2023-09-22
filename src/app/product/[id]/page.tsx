import React from 'react';
import './ProductPage.scss';
import Image from 'next/image';
import Price from '@/components/price/Price';
import { ProductType } from '@/types/types';
import DeleteButton from '@/components/admin-components/delete-button/DeleteButton';
const getProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Помилка отримання даних з серверу...');
  }
  return res.json();
};
const ProductPage = async ({ params }: { params: { id: string } }) => {
  console.log(params)
  const singleProduct: ProductType = await getProduct(params.id);
  return (
    <div className='single-product'>
      {singleProduct && (
        <div className='single-product-image-container'>
          <Image src={singleProduct.img || '/Image_not_available.png'} alt='/Image_not_available.png' fill />
        </div>
      )}

      <div className='single-product-text-container'>
        <h1>{singleProduct.title}</h1>
        <p>{singleProduct.description}</p>
        <Price
          product={singleProduct}
        />
      </div>
      <DeleteButton id={singleProduct.id}/>
    </div>
  );
};

export default ProductPage;
