export type ProductCategory = 'hot-drinks' | 'cold-drinks' | 'desserts';

export interface ProductSize {
  id: string;
  name: string;
  priceModifier: number;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  sizes: ProductSize[];
  addons: ProductAddon[];
  featured?: boolean;
}

export const productSizes: ProductSize[] = [
  { id: 'small', name: 'Small', priceModifier: 0 },
  { id: 'medium', name: 'Medium', priceModifier: 10 },
  { id: 'large', name: 'Large', priceModifier: 20 },
];

export const productAddons: ProductAddon[] = [
  { id: 'extra-shot', name: 'Extra Shot', price: 15 },
  { id: 'oat-milk', name: 'Oat Milk', price: 12 },
  { id: 'vanilla-syrup', name: 'Vanilla Syrup', price: 8 },
  { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 10 },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 8 },
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'signature-espresso',
    name: 'Signature Espresso',
    description: 'Our house blend espresso with rich, bold flavors and a smooth finish. Made from carefully selected beans roasted to perfection.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
    category: 'hot-drinks',
    sizes: productSizes,
    addons: productAddons.filter(a => ['extra-shot', 'oat-milk'].includes(a.id)),
    featured: true,
  },
  {
    id: '2',
    slug: 'caramel-latte',
    name: 'Caramel Latte',
    description: 'Creamy espresso combined with steamed milk and rich caramel sauce, topped with a drizzle of caramel.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
    category: 'hot-drinks',
    sizes: productSizes,
    addons: productAddons,
    featured: true,
  },
  {
    id: '3',
    slug: 'classic-cappuccino',
    name: 'Classic Cappuccino',
    description: 'Traditional Italian cappuccino with equal parts espresso, steamed milk, and velvety foam.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
    category: 'hot-drinks',
    sizes: productSizes,
    addons: productAddons.filter(a => ['extra-shot', 'oat-milk', 'vanilla-syrup'].includes(a.id)),
  },
  {
    id: '4',
    slug: 'hot-chocolate',
    name: 'Belgian Hot Chocolate',
    description: 'Rich and indulgent hot chocolate made with premium Belgian cocoa and topped with whipped cream.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&h=400&fit=crop',
    category: 'hot-drinks',
    sizes: productSizes,
    addons: productAddons.filter(a => ['whipped-cream', 'vanilla-syrup'].includes(a.id)),
  },
  {
    id: '5',
    slug: 'iced-americano',
    name: 'Iced Americano',
    description: 'Bold espresso shots poured over cold water and ice for a refreshing caffeine kick.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop',
    category: 'cold-drinks',
    sizes: productSizes,
    addons: productAddons.filter(a => ['extra-shot', 'vanilla-syrup'].includes(a.id)),
    featured: true,
  },
  {
    id: '6',
    slug: 'iced-vanilla-latte',
    name: 'Iced Vanilla Latte',
    description: 'Smooth espresso with cold milk and vanilla syrup, served over ice.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    category: 'cold-drinks',
    sizes: productSizes,
    addons: productAddons,
  },
  {
    id: '7',
    slug: 'cold-brew',
    name: 'Cold Brew Coffee',
    description: 'Slow-steeped for 20 hours, our cold brew delivers a smooth, less acidic coffee experience.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    category: 'cold-drinks',
    sizes: productSizes,
    addons: productAddons.filter(a => ['oat-milk', 'vanilla-syrup', 'caramel-drizzle'].includes(a.id)),
  },
  {
    id: '8',
    slug: 'mango-smoothie',
    name: 'Tropical Mango Smoothie',
    description: 'Fresh mango blended with yogurt and a hint of honey for a tropical escape.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop',
    category: 'cold-drinks',
    sizes: productSizes.filter(s => s.id !== 'small'),
    addons: [],
  },
  {
    id: '9',
    slug: 'chocolate-croissant',
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich dark chocolate. Baked fresh daily.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=400&fit=crop',
    category: 'desserts',
    sizes: [],
    addons: [],
    featured: true,
  },
  {
    id: '10',
    slug: 'new-york-cheesecake',
    name: 'New York Cheesecake',
    description: 'Creamy, dense cheesecake with a graham cracker crust and berry compote.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop',
    category: 'desserts',
    sizes: [],
    addons: [],
  },
  {
    id: '11',
    slug: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop',
    category: 'desserts',
    sizes: [],
    addons: [],
  },
  {
    id: '12',
    slug: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    description: 'Soft, moist muffin bursting with fresh blueberries and topped with streusel.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop',
    category: 'desserts',
    sizes: [],
    addons: [],
  },
];

export const categories = [
  { id: 'hot-drinks', name: 'Hot Drinks' },
  { id: 'cold-drinks', name: 'Cold Drinks' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'all', name: 'All' },
] as const;

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory | 'all'): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};
