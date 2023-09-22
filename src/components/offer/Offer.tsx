import React from 'react';
import './Offer.scss';
import Image from 'next/image';
import CountDown from '../count-down/CountDown';
import { OfferType } from '@/types/types';
import { useRouter } from 'next/navigation';
import OfferButton from './offer-client/OfferButton';
const getOffer = async () => {
  const res = await fetch('http://localhost:3000/api/offer', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Помилка!');
  }
  return res.json();
};

const Offer = async () => {
  const offer: OfferType = await getOffer();
  return (
    <div className='offer'>
      <div className='offer-text-container'>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        {offer.date&&<CountDown date={offer.date}/>}
        
        <OfferButton id={offer.product_id}/>
      </div>
      {offer.img && (
        <div className='offer-image-container'>
          <Image src={offer.img} alt='/Image_not_available.png' fill />
        </div>
      )}
    </div>
  );
};

export default Offer;
