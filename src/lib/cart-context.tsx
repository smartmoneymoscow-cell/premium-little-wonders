import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./store-data";

type CartItem = { product: Product; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (b: boolean) => void;
  flyKey: number;
  flyingFrom: { x: number; y: number } | null;
  triggerFly: (from: { x: number; y: number }) => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [flyKey, setFlyKey] = useState(0);
  const [flyingFrom, setFlyingFrom] = useState<{ x: number; y: number } | null>(null);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      if (ex) return prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product: p, qty: 1 }];
    });
  }, []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.product.id !== id)), []);
  const setQty = useCallback((id: string, q: number) =>
    setItems((p) => p.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, q) } : i))), []);
  const clear = useCallback(() => setItems([]), []);

  const triggerFly = useCallback((from: { x: number; y: number }) => {
    setFlyingFrom(from);
    setFlyKey((k) => k + 1);
  }, []);

  const value = useMemo<CartCtx>(() => ({
    items, add, remove, setQty, clear, open, setOpen,
    flyKey, flyingFrom, triggerFly,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
  }), [items, open, flyKey, flyingFrom, add, remove, setQty, clear, triggerFly]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}
