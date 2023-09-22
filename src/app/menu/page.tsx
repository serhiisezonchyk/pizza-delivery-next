'use client';
import React from 'react';
import './MenuPage.scss';
import { menu } from '@/components/data';
import Link from 'next/link';
import { GrNext } from 'react-icons/gr';
import { CategoryType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const MenuPage = () => {
  const {data:session,status} = useSession(); 
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('http://localhost:3000/api/categories').then((res) => res.json()),
  });
  if (!data) return;
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='menu'>
      {data.map((category: CategoryType) => (
        <Link href={`menu/${category.slug}`} key={category.id}>
          <p>{category.title}</p>
          <GrNext />
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
