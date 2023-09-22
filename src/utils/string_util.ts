import { OrderType } from '@/types/types';

export const getOrderTitle = (item:OrderType)=>{
    const str:string[] = item.products.map(product=>`${product.title}(${product.optionTitle}, ${product.quantity} шт)`);
    return str;
}