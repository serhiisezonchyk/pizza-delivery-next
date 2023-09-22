type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};
type Products = Product[];

export const featuredProducts: Products = [
  {
    id: 1,
    title: 'Margherita Pizza',
    desc: 'Classic pizza with tomato sauce, mozzarella, and basil.',
    img: '/test1.png',
    price: 10.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 2,
    title: 'Pepperoni Pizza',
    desc: 'Pizza topped with pepperoni slices and mozzarella cheese.',
    img: '/test1.png',
    price: 11.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.5 },
    ],
  },
  {
    id: 3,
    title: 'Vegetarian Pizza',
    desc: 'Delicious pizza loaded with assorted vegetables.',
    img: '/test1.png',
    price: 12.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 4,
    title: 'Hawaiian Pizza',
    desc: 'Pizza with ham, pineapple, and mozzarella cheese.',
    img: '/test1.png',
    price: 13.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 5,
    title: 'Supreme Pizza',
    desc: 'Pizza with a variety of toppings including pepperoni, sausage, peppers, and onions.',
    img: '/test1.png',
    price: 14.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.5 },
    ],
  },
];

export const pizzas: Products = [
  {
    id: 1,
    title: 'Margherita Pizza',
    desc: 'Classic pizza with tomato sauce, mozzarella, and basil.',
    img: '/test1.png',
    price: 10.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 2,
    title: 'Pepperoni Pizza',
    desc: 'Pizza topped with pepperoni slices and mozzarella cheese.',
    img: '/test1.png',
    price: 11.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.5 },
    ],
  },
  {
    id: 3,
    title: 'Vegetarian Pizza',
    desc: 'Delicious pizza loaded with assorted vegetables.',
    img: '/test1.png',
    price: 12.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 4,
    title: 'Hawaiian Pizza',
    desc: 'Pizza with ham, pineapple, and mozzarella cheese.',
    img: '/test1.png',
    price: 13.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 5,
    title: 'Supreme Pizza',
    desc: 'Pizza with a variety of toppings including pepperoni, sausage, peppers, and onions.',
    img: '/test1.png',
    price: 14.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.5 },
    ],
  },
  {
    id: 6,
    title: 'BBQ Chicken Pizza',
    desc: 'Pizza with BBQ sauce, chicken, red onions, and mozzarella cheese.',
    img: '/test1.png',
    price: 15.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 3.0 },
    ],
  },
  {
    id: 7,
    title: 'Mushroom Pizza',
    desc: 'Pizza topped with fresh mushrooms and mozzarella cheese.',
    img: '/test1.png',
    price: 12.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
  {
    id: 8,
    title: 'Meat Lovers Pizza',
    desc: 'Pizza loaded with various meats including pepperoni, sausage, and bacon.',
    img: '/test1.png',
    price: 16.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 3.0 },
    ],
  },
  {
    id: 9,
    title: 'Veggie Deluxe Pizza',
    desc: 'Deluxe pizza with a variety of veggies and mozzarella cheese.',
    img: '/test1.png',
    price: 13.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.5 },
    ],
  },
  {
    id: 10,
    title: 'Four Cheese Pizza',
    desc: 'Pizza with a blend of four cheeses: mozzarella, cheddar, parmesan, and provolone.',
    img: '/test1.png',
    price: 14.99,
    options: [
      { title: '30cm', additionalPrice: 1.0 },
      { title: '40cm', additionalPrice: 2.0 },
    ],
  },
];

type Menu = {
  id: number;
  slug: string;
  title: string;
}[];

export const singleProduct: Product = {
  id: 2,
  title: 'Pepperoni Pizza',
  desc: 'Pizza topped with pepperoni slices and mozzarella cheese.',
  img: '/test1.png',
  price: 11.99,
  options: [
    { title: '30cm', additionalPrice: 1.0 },
    { title: '40cm', additionalPrice: 2.5 },
  ],
};

export const menu: Menu = [
  {
    id: 1,
    slug: 'pizza',
    title: 'Піцца',
  },
  {
    id: 2,
    slug: 'sushi',
    title: 'Суші',
  },
  {
    id: 3,
    slug: 'combos',
    title: 'Комбо-меню',
  },
  {
    id: 4,
    slug: 'drinks',
    title: 'Напої',
  },
];
