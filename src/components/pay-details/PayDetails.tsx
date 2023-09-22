import { AddressElement } from '@stripe/react-stripe-js';
import React from 'react';

const PayDetails = () => {
  return <form>
    <h3>Адреса</h3>
    <AddressElement options={{mode:"shipping"}} onChange={(event)=>{
        if(event.complete){
            const address = event.value.address;
        }
    }}/>
  </form>;
};

export default PayDetails;
