export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New" | "Sale" | "Top Rated";
  skinType: string[];
  description: string;
  ingredients: string[];
  howToUse: string;
  size: string;
  stock: number;
  image: string;
  imageUrl: string;
  images: string[];
};

const grads = [
  "from-purple-200 via-white to-amber-100",
  "from-fuchsia-200 via-white to-purple-100",
  "from-amber-100 via-white to-rose-100",
  "from-purple-300 via-fuchsia-100 to-white",
  "from-blue-100 via-white to-purple-100",
  "from-rose-100 via-amber-50 to-white",
  "from-emerald-100 via-white to-amber-100",
  "from-purple-100 via-white to-pink-100",
  "from-amber-200 via-white to-purple-100",
];

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const heroImageUrl = U("photo-1556228720-195a672e8a03", 1400);

export const categories = [
  { slug: "face-care", name: "Face Care", imageUrl: U("photo-1596462502278-27bfdc403348", 500) },
  { slug: "body-care", name: "Body Care", imageUrl: U("photo-1608248543803-ba4f8c70ae0b", 500) },
  { slug: "acne-treatment", name: "Acne Treatment", imageUrl: U("photo-1556228578-8c89e6adf883", 500) },
  { slug: "serums", name: "Serums", imageUrl: U("photo-1620916566398-39f1143ab7be", 500) },
  { slug: "sunscreens", name: "Sunscreens", imageUrl: U("photo-1556228453-efd6c1ff04f6", 500) },
];

export const brands = ["EtiSkin", "CeraVe", "The Ordinary", "Neutrogena", "La Roche-Posay", "Garnier"];

export const products: Product[] = [
  {
    slug: "radiance-vitamin-c-serum",
    name: "Radiance Vitamin C Serum",
    brand: "EtiSkin", category: "serums", price: 12500, compareAt: 15000, rating: 4.8, reviews: 284,
    badge: "Best Seller", skinType: ["Oily", "Normal", "Combination"],
    description: "A brightening serum with 15% Vitamin C to fade dark spots, even skin tone, and deliver a luminous glow.",
    ingredients: ["Vitamin C (Ascorbic Acid) 15%", "Vitamin E", "Ferulic Acid", "Hyaluronic Acid"],
    howToUse: "Apply 3-4 drops to clean skin in the morning. Follow with moisturizer and SPF.",
    size: "30ml", stock: 42, image: grads[0],
    imageUrl: U("photo-1620916566398-39f1143ab7be"),
    images: [U("photo-1620916566398-39f1143ab7be"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1556228453-efd6c1ff04f6"), U("photo-1556228578-8c89e6adf883")],
  },
  {
    slug: "hydra-boost-moisturizer",
    name: "Hydra-Boost Moisturizer",
    brand: "EtiSkin", category: "face-care", price: 9800, rating: 4.7, reviews: 196, badge: "New",
    skinType: ["Dry", "Normal", "Sensitive"],
    description: "A lightweight gel-cream with hyaluronic acid and ceramides for 72-hour hydration.",
    ingredients: ["Hyaluronic Acid", "Ceramides", "Niacinamide", "Squalane"],
    howToUse: "Apply morning and night to cleansed skin.",
    size: "50ml", stock: 68, image: grads[1],
    imageUrl: U("photo-1608248543803-ba4f8c70ae0b"),
    images: [U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1620916566398-39f1143ab7be"), U("photo-1556228578-8c89e6adf883"), U("photo-1596462502278-27bfdc403348")],
  },
  {
    slug: "spf-50-sunscreen",
    name: "SPF 50 Sunscreen PA+++",
    brand: "EtiSkin", category: "sunscreens", price: 7200, compareAt: 8500, rating: 4.9, reviews: 512,
    skinType: ["All"],
    description: "Broad-spectrum mineral sunscreen with a weightless finish. No white cast.",
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E", "Green Tea Extract"],
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours.",
    size: "50ml", stock: 120, image: grads[2],
    imageUrl: U("photo-1556228453-efd6c1ff04f6"),
    images: [U("photo-1556228453-efd6c1ff04f6"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1556228578-8c89e6adf883"), U("photo-1620916566398-39f1143ab7be")],
  },
  {
    slug: "acne-clear-gel-cleanser",
    name: "Acne Clear Gel Cleanser",
    brand: "The Ordinary", category: "acne-treatment", price: 6500, rating: 4.6, reviews: 388, badge: "Top Rated",
    skinType: ["Oily", "Combination"],
    description: "2% salicylic acid gel cleanser to clear breakouts and unclog pores.",
    ingredients: ["Salicylic Acid 2%", "Niacinamide", "Tea Tree Oil"],
    howToUse: "Massage onto damp skin, rinse thoroughly. Use daily.",
    size: "150ml", stock: 55, image: grads[3],
    imageUrl: U("photo-1556228578-8c89e6adf883"),
    images: [U("photo-1556228578-8c89e6adf883"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1620916566398-39f1143ab7be"), U("photo-1556228453-efd6c1ff04f6")],
  },
  {
    slug: "retinol-night-cream",
    name: "Retinol Night Cream",
    brand: "CeraVe", category: "face-care", price: 14000, compareAt: 18000, rating: 4.8, reviews: 342, badge: "Sale",
    skinType: ["Normal", "Combination", "Dry"],
    description: "0.5% encapsulated retinol reduces fine lines and refines skin texture overnight.",
    ingredients: ["Retinol 0.5%", "Ceramides", "Niacinamide", "Hyaluronic Acid"],
    howToUse: "Apply a pea-size amount to clean dry skin at night. Start 2x weekly and gradually increase.",
    size: "30ml", stock: 35, image: grads[4],
    imageUrl: U("photo-1596462502278-27bfdc403348"),
    images: [U("photo-1596462502278-27bfdc403348"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1556228453-efd6c1ff04f6"), U("photo-1620916566398-39f1143ab7be")],
  },
  {
    slug: "hyaluronic-acid-toner",
    name: "Hyaluronic Acid Toner",
    brand: "La Roche-Posay", category: "face-care", price: 8500, rating: 4.5, reviews: 178,
    skinType: ["Dry", "Normal", "Sensitive"],
    description: "Hydrating toner with hyaluronic acid and thermal spring water to prep skin.",
    ingredients: ["Hyaluronic Acid", "Thermal Spring Water", "Glycerin"],
    howToUse: "Apply to cotton pad or press directly into skin after cleansing.",
    size: "200ml", stock: 90, image: grads[5],
    imageUrl: U("photo-1556228578-8c89e6adf883"),
    images: [U("photo-1556228578-8c89e6adf883"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1620916566398-39f1143ab7be"), U("photo-1556228453-efd6c1ff04f6")],
  },
  {
    slug: "niacinamide-serum",
    name: "Niacinamide 10% Serum",
    brand: "The Ordinary", category: "serums", price: 5800, rating: 4.7, reviews: 524,
    skinType: ["Oily", "Combination", "Sensitive"],
    description: "10% niacinamide serum to minimize pores, even skin tone, and strengthen barrier.",
    ingredients: ["Niacinamide 10%", "Zinc PCA", "Salicylic Acid"],
    howToUse: "Apply 2-3 drops to entire face morning and night before heavier creams.",
    size: "30ml", stock: 75, image: grads[6],
    imageUrl: U("photo-1620916566398-39f1143ab7be"),
    images: [U("photo-1620916566398-39f1143ab7be"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1556228453-efd6c1ff04f6"), U("photo-1556228578-8c89e6adf883")],
  },
  {
    slug: "rose-hip-oil",
    name: "Rose Hip Oil",
    brand: "Neutrogena", category: "serums", price: 9200, compareAt: 11500, rating: 4.6, reviews: 209, badge: "Sale",
    skinType: ["Dry", "Normal", "Sensitive"],
    description: "Cold-pressed rose hip oil rich in vitamin A to restore radiance.",
    ingredients: ["Rose Hip Seed Oil", "Vitamin E", "Jojoba Oil"],
    howToUse: "Warm 2-3 drops between palms and press into skin.",
    size: "30ml", stock: 46, image: grads[7],
    imageUrl: U("photo-1631730359585-38a4935cbec4"),
    images: [U("photo-1631730359585-38a4935cbec4"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1620916566398-39f1143ab7be"), U("photo-1556228453-efd6c1ff04f6")],
  },
  {
    slug: "kojic-acid-soap",
    name: "Kojic Acid Soap Bar",
    brand: "Garnier", category: "body-care", price: 2500, compareAt: 3200, rating: 4.4, reviews: 430,
    skinType: ["All"],
    description: "Gentle brightening bar with kojic acid and glycerin for even-toned skin.",
    ingredients: ["Kojic Acid", "Glycerin", "Shea Butter"],
    howToUse: "Lather onto damp skin daily in the shower.",
    size: "100g", stock: 210, image: grads[8],
    imageUrl: U("photo-1600857544200-b2f666a9a2ec"),
    images: [U("photo-1600857544200-b2f666a9a2ec"), U("photo-1608248543803-ba4f8c70ae0b"), U("photo-1556228453-efd6c1ff04f6"), U("photo-1620916566398-39f1143ab7be")],
  },
];

export const testimonials = [
  { name: "Amara O.", role: "Verified Customer — Radiance Serum",
    quote: "This serum transformed my skin in just 2 weeks. I get compliments everywhere I go now.", rating: 5,
    avatar: U("photo-1531123897727-8f129e1688ce", 200) },
  { name: "Chidinma E.", role: "Verified Customer — SPF 50 Sunscreen",
    quote: "Finally found a sunscreen that doesn't leave white cast on my skin. Absolutely love it!", rating: 5,
    avatar: U("photo-1544005313-94ddf0286df2", 200) },
  { name: "Fatima K.", role: "Verified Customer — Hydra-Boost",
    quote: "The Hydra-Boost moisturizer is incredible. My skin stays hydrated all day long.", rating: 5,
    avatar: U("photo-1554151228-14d9def656e4", 200) },
];

export type BlogPost = {
  slug: string; title: string; excerpt: string; content: string;
  author: string; date: string; category: string; readTime: string; imageUrl: string;
};

export const blogPosts: BlogPost[] = [
  { slug: "5-step-routine-glowing-skin", title: "The 5-Step Routine For Truly Glowing Skin",
    excerpt: "A dermatologist-approved framework you can start tonight — no matter your skin type.",
    content: "Building a great skincare routine isn't about buying more products — it's about consistency and layering the right actives in the right order. Start with a gentle cleanser, follow with a hydrating toner, apply your treatment serum (Vitamin C in the morning, retinol at night), lock everything in with a moisturizer, and never skip SPF during the day. Give each product at least 6-8 weeks to show results.",
    author: "Dr. Sinéla Nnena", date: "2026-06-24", category: "Routines", readTime: "6 min read",
    imageUrl: U("photo-1596178067639-5c6e68aea6dc", 1200) },
  { slug: "vitamin-c-vs-niacinamide", title: "Vitamin C vs. Niacinamide: Which Do You Need?",
    excerpt: "Both are brightening powerhouses. Here's how to decide, and how to layer them safely.",
    content: "Vitamin C is a potent antioxidant that fades dark spots and boosts collagen. Niacinamide regulates oil, minimizes pores, and strengthens the skin barrier. Contrary to old advice, they can be layered — apply Vitamin C first, wait 2 minutes, then Niacinamide. Consistency beats potency every time.",
    author: "Adaeze Okafor", date: "2026-05-11", category: "Ingredients", readTime: "4 min read",
    imageUrl: U("photo-1620916566398-39f1143ab7be", 1200) },
  { slug: "sunscreen-myths-debunked", title: "5 Sunscreen Myths, Debunked",
    excerpt: "No, darker skin doesn't skip SPF. Here's the science.",
    content: "Melanin offers partial protection, but not enough to prevent hyperpigmentation, aging, or skin cancer. Reapply every 2 hours outdoors. Mineral and chemical formulas both work — pick the texture you'll actually use every day.",
    author: "Dr. Sinéla Nnena", date: "2026-04-02", category: "Sun Care", readTime: "5 min read",
    imageUrl: U("photo-1556228453-efd6c1ff04f6", 1200) },
  { slug: "how-to-treat-acne-scars", title: "The Honest Guide To Treating Acne Scars",
    excerpt: "What actually fades scars, what doesn't, and how long it really takes.",
    content: "Post-inflammatory hyperpigmentation fades over 3-6 months with consistent Vitamin C, niacinamide, and daily SPF. Textural scars need in-clinic treatments like microneedling or laser. Never pick.",
    author: "Tunde Bello", date: "2026-03-14", category: "Concerns", readTime: "7 min read",
    imageUrl: U("photo-1512290923902-8a9f81dc236c", 1200) },
];

export type Order = {
  id: string; customer: string; email: string;
  date: string; status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number; items: number; productSlugs: string[];
};

export const orders: Order[] = [
  { id: "ETI-10284", customer: "Amara Obi", email: "amara@example.com", date: "2026-07-08", status: "Delivered", total: 24800, items: 3, productSlugs: ["radiance-vitamin-c-serum", "hydra-boost-moisturizer", "spf-50-sunscreen"] },
  { id: "ETI-10283", customer: "Kola Adeyemi", email: "kola@example.com", date: "2026-07-08", status: "Shipped", total: 12500, items: 1, productSlugs: ["radiance-vitamin-c-serum"] },
  { id: "ETI-10282", customer: "Fatima Kalu", email: "fatima@example.com", date: "2026-07-07", status: "Processing", total: 38400, items: 5, productSlugs: ["acne-clear-gel-cleanser", "retinol-night-cream", "hyaluronic-acid-toner", "niacinamide-serum", "rose-hip-oil"] },
  { id: "ETI-10281", customer: "Chidinma Eze", email: "chid@example.com", date: "2026-07-07", status: "Pending", total: 7200, items: 1, productSlugs: ["spf-50-sunscreen"] },
  { id: "ETI-10280", customer: "Segun Okafor", email: "segun@example.com", date: "2026-07-06", status: "Delivered", total: 19300, items: 2, productSlugs: ["hydra-boost-moisturizer", "kojic-acid-soap"] },
  { id: "ETI-10279", customer: "Zainab Musa", email: "zainab@example.com", date: "2026-07-06", status: "Delivered", total: 6500, items: 1, productSlugs: ["acne-clear-gel-cleanser"] },
  { id: "ETI-10278", customer: "Tunde Bello", email: "tunde@example.com", date: "2026-07-05", status: "Cancelled", total: 14000, items: 1, productSlugs: ["retinol-night-cream"] },
  { id: "ETI-10277", customer: "Ngozi Uche", email: "ngozi@example.com", date: "2026-07-05", status: "Shipped", total: 28900, items: 4, productSlugs: ["radiance-vitamin-c-serum", "spf-50-sunscreen", "niacinamide-serum", "kojic-acid-soap"] },
];

export const customers = [
  { id: "C-001", name: "Amara Obi", email: "amara@example.com", orders: 12, spend: 184200, joined: "2024-11-02" },
  { id: "C-002", name: "Kola Adeyemi", email: "kola@example.com", orders: 6, spend: 82000, joined: "2025-02-14" },
  { id: "C-003", name: "Fatima Kalu", email: "fatima@example.com", orders: 18, spend: 312400, joined: "2024-05-19" },
  { id: "C-004", name: "Chidinma Eze", email: "chid@example.com", orders: 3, spend: 21600, joined: "2026-01-08" },
  { id: "C-005", name: "Segun Okafor", email: "segun@example.com", orders: 9, spend: 145300, joined: "2025-06-23" },
  { id: "C-006", name: "Zainab Musa", email: "zainab@example.com", orders: 4, spend: 32800, joined: "2025-09-11" },
  { id: "C-007", name: "Tunde Bello", email: "tunde@example.com", orders: 2, spend: 18400, joined: "2026-03-20" },
];

export const salesData = [
  { month: "Jan", revenue: 1240000, orders: 142 },
  { month: "Feb", revenue: 1580000, orders: 178 },
  { month: "Mar", revenue: 1420000, orders: 165 },
  { month: "Apr", revenue: 1890000, orders: 210 },
  { month: "May", revenue: 2150000, orders: 245 },
  { month: "Jun", revenue: 2480000, orders: 289 },
  { month: "Jul", revenue: 2810000, orders: 318 },
];

export const formatN = (n: number) => "₦" + n.toLocaleString("en-NG");

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const getBlogPost = (slug: string) => blogPosts.find(p => p.slug === slug);