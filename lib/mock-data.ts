import type { Category, Product } from './types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic devices and accessories',
    image_url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Beautiful items for your home',
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy fashion and accessories',
    image_url: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear for active lifestyles',
    image_url: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '🎄Christmas Mega Sale – 49% OFF! 🔥 Instant Tire Plug Repair Kit 🚚BUY MORE SAVE MORE',
    slug: 'wireless-headphones-noise-cancelling',
    description: 'Just clean the puncture ➝ push in the rubber nail ➝ trim ➝ inflate… and you’re back on the road! 🚗💨',
    price: 19.99,
    compare_at_price: 27.96,
    image_url: 'https://economicalkshop.com/cdn/shop/files/1764996394460.png?v=1764996453&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/files/610ieNO7KtL-AC-SL1200.jpg?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/1765341728802.png?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/s-l1600-35.png?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/10-pcs-set-tyre-repair-screw-rub.png?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/rubber-6.png?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/d736ce5ecfbd42f4a0f4adefc5898efc.png?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/71rGyoQ4a7L-AC-SL1200.jpg?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/71AMn2ByhzL-AC-SL1200.jpg?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/61od91ODTTL-AC-SL1200.jpg?v=1765341764&width=1646',
      'https://economicalkshop.com/cdn/shop/files/rubber-4.png?v=1765341764&width=1646',
    ],
    category_id: '1',
    stock: 45,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: '2',
    name: '🔥Last save 49% OFF Bathroom Sink Stopper Hair Catcher, Universal Pop Up Sink Drain Filter with Stainless Steel Filter Basket, Bathroom Sink Drain Strainer',
    slug: 'smart-fitness-watch',
    description: 'Advanced fitness tracking, heart rate monitoring, GPS, and smartphone notifications. Water-resistant design with 7-day battery life. Stay connected and healthy.',
    price: 15.99,
    compare_at_price: 31.50,
    image_url: 'https://economicalkshop.com/cdn/shop/files/a322c260b66d94f890572df666d7d5d6b563ab4b.jpg?v=1758535121&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/files/50e91ef7ca2d98627cb883602d80dd2d9925540b.jpg?v=1758535121&width=1646',
      'https://economicalkshop.com/cdn/shop/files/c42e242e2cf7b101cb3c9ee693a1819b37049726.jpg?v=1758535121&width=1646',
      'https://economicalkshop.com/cdn/shop/files/ff6b3d630a99e254b9ffdaba9988c9c9a5213e67.jpg?v=1758535121&width=1646',
      'https://economicalkshop.com/cdn/shop/files/408ebd50798735525105eaf6566fb8c83e5b463f.jpg?v=1758535121&width=1646',
      'https://economicalkshop.com/cdn/shop/files/528ec8ecf19daa274119a71002dac6f11ca11945.jpg?v=1758535122&width=1646',
      'https://economicalkshop.com/cdn/shop/files/728e6be3f394b6ec19655e1fbc5dc0090a00536d.jpg?v=1758535121&width=1646',
    ],
    category_id: '1',
    stock: 32,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: '3',
    name: '🏆Flash Sale⚡ 50K+ SOLD!🔥🍽️Cactus Kitchen Automatic Dumping Sink Filter(BUY 2 GET 1 FREE)',
    slug: 'portable-power-bank-fast-charging',
    description: 'High-capacity power bank with fast charging technology. Charge multiple devices simultaneously. Perfect for travel, camping, and everyday use.',
    price: 19.99,
    compare_at_price: 39.15,
    image_url: 'https://economicalkshop.com/cdn/shop/files/012c6f616e89c577d6ab91bfbc3ddb74891d4ca2.jpg?v=1756727171&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/files/f747f83e21adeab6a21213be06c3c3cf6dea397e.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/fb182d0647e42b81f6f2c5c40ef03aeeb21baefd.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/671f462f4bc5458a5499b9f2c2a3ff287a9d4403.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/d80ad218aae81e227cc564147a0b8ff83e62caf0.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/b28ec08fe106c5bfa91ce38133d1a2a7d12bc960.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/4b49dcd7cc644ef6b77845ccad14e5d6422eb968.jpg?v=1756727172&width=1646',
      'https://economicalkshop.com/cdn/shop/files/da574027d86fecf0b273c9d8a1985d5dd013c079.jpg?v=1756727171&width=1646',
      'https://economicalkshop.com/cdn/shop/files/1dffd07c148d44d6223e0b22fe1f0848ac4642e8.jpg?v=1756727171&width=1646',
    ],
    category_id: '1',
    stock: 67,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '4',
    name: '💧2025 New Release - 🍽️Suction Cup Sink Corner Rack（🔥Buy 2 Get 1 Free）',
    slug: 'led-desk-lamp-adjustable-brightness',
    description: 'Elegant minimalist design with adjustable brightness. LED technology for energy efficiency. Perfect for bedroom, office, or living room.',
    price: 15.99,
    compare_at_price: 30.15,
    image_url: 'https://economicalkshop.com/cdn/shop/files/98367e2202fd8c837c93bef1581653a8d11cf439.jpg?v=1754997006&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/files/af15a733705dc9e9b64aeb7db77d9141ee7a51bd.jpg?v=1754997006&width=1646',
      'https://economicalkshop.com/cdn/shop/files/ab330aa9c85fc10c0d3c778c4f1a0308c891ccba.jpg?v=1754997006&width=1646',
      'https://economicalkshop.com/cdn/shop/files/8ef034ebb909f22eb9fff74e8fabf8860970c3e0.png?v=1754997006&width=1646',
      'https://economicalkshop.com/cdn/shop/files/1755150387806.png?v=1755150415&width=1646',

    ],
    category_id: '2',
    stock: 28,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: '5',
    name: 'FAVORITE OFF SHOULDER SWEATER',
    slug: 'favorite-off-shoulder-sweater',
    description: '55%Acrylic 45%Cotton',
    price: 59.98,
    compare_at_price: null,
    image_url: 'https://economicalkshop.com/cdn/shop/products/LT3057L_29_f2871bd4-8122-427c-94b5-4f92743f5ee5.jpg?v=1703571763&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/products/LT3057L_17.jpg?v=1703571763&width=1646',
      'https://economicalkshop.com/cdn/shop/products/LT3057L_15.jpg?v=1703571763&width=1646',
      'https://economicalkshop.com/cdn/shop/products/LT3057L_20.jpg?v=1703571763&width=1646',
    ],
    category_id: '2',
    stock: 15,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '6',
    name: 'Double Belt Mini Skirt',
    slug: 'double-belt-mini-skirt',
    description: 'This timeless double belt mini skirt can be transformed by removing the double belt; allowing for a range of looks to suit any style. It features dark grey suiting material, single back pocket, in built shorts and mini length ',
    price: 59.98,
    compare_at_price: null,
    image_url: 'https://economicalkshop.com/cdn/shop/products/CurvedHemTopDoubleBeltMiniSkirt15.jpg?v=1703571755&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/products/CurvedHemTopDoubleBeltMiniSkirt1.jpg?v=1703571755&width=1646',
      'https://economicalkshop.com/cdn/shop/products/CurvedHemTopDoubleBeltMiniSkirt12_6162eebc-8a7b-4915-b415-54a1da959768.jpg?v=1703571755&width=1646',
      'https://economicalkshop.com/cdn/shop/products/CurvedHemTopDoubleBeltMiniSkirt13_1e9356dc-ed81-4a91-8368-143a3141c43c.jpg?v=1703571755&width=1646',
    ],
    category_id: '2',
    stock: 52,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: '7',
    name: 'CROCHET TOP',
    slug: 'crochet-top',
    description: '100% ACRYLIC',
    price: 49.98,
    compare_at_price: null,
    image_url: 'https://economicalkshop.com/cdn/shop/products/A15I2532_202c8718-057c-47f6-bad4-dbe0ba1470d6.jpg?v=1703572026&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/products/A15I2528_d25421d6-2fe4-433d-aa80-8747eefbfa1a.jpg?v=1703572026&width=1646',
      'https://economicalkshop.com/cdn/shop/products/A15I2538.jpg?v=1703572026&width=1646',
      'https://economicalkshop.com/cdn/shop/products/A15I2546.jpg?v=1703572026&width=1646',
    ],
    category_id: '3',
    stock: 38,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '8',
    name: '2022 Women Halter Lace Up Crop Top Split Mini Skirt',
    slug: '2022-women-halter-lace-up-crop-top-split-mini-skirt',
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments for organization. Perfect for everyday use.',
    price: 8.65,
    compare_at_price: null,
    image_url: 'https://economicalkshop.com/cdn/shop/products/S431affe50de046f6bce9ca79cbc479f5r_97a24adf-efd6-4c5d-9573-3eb2dfb83600.jpg?v=1703571674&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/products/Sad072d9aef274ed9b9272dac06cbdae5g_8d537df1-c545-4e43-9266-43337e2bb6bd.jpg?v=1703571674&width=1646',
      'https://economicalkshop.com/cdn/shop/products/S82f5622d546e4b3f84c889dd5f7ec9e6O_c0507734-d83c-4efe-b20d-7416e4591846.jpg?v=1703571674&width=1646',
      'https://economicalkshop.com/cdn/shop/products/S6d57ef995d774f0881df4b5a2f542eefp_ab65a948-2ee4-49bd-add2-9c3b7cc35825.jpg?v=1703571674&width=1646',
    ],
    category_id: '3',
    stock: 24,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: '9',
    name: '⚡Official Authorized | MFi-Certified Cables🔥 2-in-1 Invisible Holder Charger Cable - 240W Fast Charging Cord with Built-In Phone Stand',
    slug: 'official-authorized',
    description: 'Professional running shoes with advanced cushioning technology. Breathable mesh upper and durable rubber outsole. Ideal for serious runners.',
    price: 16.99,
    compare_at_price: 33.31,
    image_url: 'https://economicalkshop.com/cdn/shop/files/90_cb9fc34e-c590-4647-9d6a-db83f20bb698.jpg?v=1765785899&width=1646',
    images: ['https://economicalkshop.com/cdn/shop/files/e5995016d5676369e35909bf6151896c964a7f2f.jpg?v=1765785924&width=1646',
      'https://economicalkshop.com/cdn/shop/files/741648b83ec3b9e589631885b3f05965864b88fb.jpg?v=1765785924&width=1646',
      'https://economicalkshop.com/cdn/shop/files/7dcd694e5deeca2a93f0146f49f15a3a10c7a5c6.jpg?v=1765785924&width=1646',
      'https://economicalkshop.com/cdn/shop/files/da5519d62afc68a1db5074972ec5020f8380521f.jpg?v=1765785924&width=1646',
    ],
    category_id: '4',
    stock: 41,
    is_featured: false,
    is_bestseller: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  const product = mockProducts.find(p => p.slug === slug);
  if (product && product.category_id) {
    const category = mockCategories.find(c => c.id === product.category_id);
    return {
      ...product,
      categories: category || null,
    };
  }
  return product;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(p => p.category_id === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(p => p.is_featured);
}

export function getBestsellerProducts(): Product[] {
  return mockProducts.filter(p => p.is_bestseller);
}

export function getRelatedProducts(categoryId: string | null, currentProductId: string): Product[] {
  if (!categoryId) return [];
  return mockProducts
    .filter(p => p.category_id === categoryId && p.id !== currentProductId)
    .slice(0, 4);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}
