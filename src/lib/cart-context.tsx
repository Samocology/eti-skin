import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./data";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  wishlist: string[];
  toggleWish: (slug: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("etiskin_cart");
      const w = localStorage.getItem("etiskin_wish");
      if (c) setItems(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("etiskin_cart", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem("etiskin_wish", JSON.stringify(wishlist));
  }, [wishlist]);

  const add = (p: Product, qty = 1) =>
    setItems(prev => {
      const ex = prev.find(i => i.product.slug === p.slug);
      if (ex) return prev.map(i => i.product.slug === p.slug ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product: p, qty }];
    });
  const remove = (slug: string) => setItems(prev => prev.filter(i => i.product.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems(prev => prev.map(i => i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i));
  const clear = () => setItems([]);
  const toggleWish = (slug: string) =>
    setWishlist(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, wishlist, toggleWish }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
