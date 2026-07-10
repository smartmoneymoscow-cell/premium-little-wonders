import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/store-data";
import { ProductThumb } from "./product-thumb";

export function CartDrawer() {
  const { open, setOpen, items, remove, setQty, total, count } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-primary/30 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-background shadow-premium"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Корзина</h3>
                  <p className="text-xs text-muted-foreground">{count} {count === 1 ? "товар" : "товара"}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-secondary"
                aria-label="Свернуть корзину"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-secondary text-3xl">🧺</div>
                  <p className="font-medium text-foreground">Корзина пуста</p>
                  <p className="mt-1 text-sm text-muted-foreground">Добавьте товары из каталога</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.li
                        key={it.product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <ProductThumb id={it.product.id} color={it.product.color} category={it.product.category} />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-sm font-medium text-foreground">{it.product.name}</p>
                          <p className="text-xs text-muted-foreground">{it.product.brand}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                              <button onClick={() => setQty(it.product.id, it.qty - 1)} className="grid h-6 w-6 place-items-center rounded-full text-primary hover:bg-background">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                              <button onClick={() => setQty(it.product.id, it.qty + 1)} className="grid h-6 w-6 place-items-center rounded-full text-primary hover:bg-background">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-bold text-primary">{formatPrice(it.product.price * it.qty)}</p>
                          </div>
                        </div>
                        <button onClick={() => remove(it.product.id)} className="self-start text-muted-foreground hover:text-destructive" aria-label="Удалить">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border bg-card px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Итого</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95">
                  Перейти к оформлению <ChevronRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">Бесплатная доставка от 3 000 ₽</p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
