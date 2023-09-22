'use client';
import React from 'react';
import './Slider.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SliderType } from '@/types/types';
const Slider = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const { isLoading, error, data } = useQuery<SliderType[]>({
    queryKey: ['slider'],
    queryFn: () => fetch('/api/sliders').then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      const interval = setInterval(
        () =>
          setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
        5000
      );
      return () => clearInterval(interval);
    }
  }, [isLoading, data]);
  if (isLoading || !data || data.length === 0) return <p>Завантаження</p>;

  return (
    <div className='slider'>
      <div className='slider-text-container'>
        <h1>{data[currentSlide].title}</h1>
        <p> {data[currentSlide].description}</p>
        <button onClick={() => router.push('/menu')}>Замовити зараз</button>
      </div>
      {data[currentSlide].img && (
        <div className='slider-img-container'>
          <Image
            fill
            src={data[currentSlide].img||''}
            alt='/Image_not_available.png'
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
