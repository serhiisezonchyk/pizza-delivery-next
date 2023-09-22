export type CategoryType = {
  id: string;
  slug: string;
  title: string;
  active: boolean;
};

export type ProductType = {
  id: string;
  title: string;
  description?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

export type ItemCartType = {
  id: string;
  title: string;
  img?: string;
  quantity: number;
  price: number;
  optionTitle?: string;
};

export type OrderType = {
  id: string;
  price: number;
  products: ItemCartType[];
  statusTitle: string;
  intent_id?: string;
  name?: string;
  phone?: string;
  isPaymentUponReceipt: boolean;
  userEmail: string;
  created_at?: Date;
};

export type StatusType = {
  id: string;
  title: string;
};

export type CartType = {
  products: ItemCartType[];
  quantity: number;
  totalPrice: number;
};

export type MessageType = {
  title: string;
};
export type OfferType = {
  title: string;
  description: string;
  img?: string;
  date?: Date;
  product_id: string;
};
export type SliderType = {
  title: string;
  description: string;
  img?: string;
};
export type ActionType = {
  addToCart: (item: ItemCartType) => void;
  removeFromCart: (item: ItemCartType) => void;
  clearCart: () => void;
};
