import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './CategoryPage.scss';
import { ProductType } from '@/types/types';
import AddToCartButton from '@/components/to-cart-button/AddToCartButton';
import NavigateToAddProd from './NavigateToAddProd';
const getProducts = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?category=${category}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Помилка!');
  }
  return res.json();
};

type Props = {
  params: { category: string };
};
const CategotyPage = async ({ params }: Props) => {
  const products: ProductType[] = await getProducts(params.category);
  return (
    <div className={`category-page ${products.length === 0 ? 'empty' : ''}`}>
      {products.length === 0 && <h1>Очікуйте оновлення...</h1>}
      {products.map((item) => (
        <Link
          className='category-page-item group'
          href={`/product/${item.id}`}
          key={item.id}
        >
          <div className='category-page-item-image-container'>
            <Image
              src={item.img || '/Image_not_available.png'}
              alt='/Image_not_available.png'
              fill
            />
            <div className='category-page-item-image-desc hidden sm:group-hover:block'>
              <p className=''>{item.description}</p>
            </div>
          </div>

          <div className='category-page-item-text-container'>
            <h1>{item.title}</h1>
            <h1 className='price sm:group-hover:hidden'>{item.price}</h1>
            <div className='block sm:hidden sm:group-hover:block'>
              <AddToCartButton product={item} />
            </div>
          </div>
        </Link>
      ))}
      <NavigateToAddProd/>
    </div>
  );
};

export default CategotyPage;
