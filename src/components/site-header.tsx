import { Heart, LogIn, Menu, Search, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export function SiteHeader({ onSearch, query }: { onSearch: (s: string) => void; query: string }) {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:py-4">
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary lg:hidden" aria-label="Меню">
          <Menu className="h-5 w-5" />
        </button>
        <a href="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl text-primary-foreground shadow-soft" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate font-display text-sm font-bold leading-none text-primary">Сайт для Юрия</p>
            <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">с YouDo · детские товары</p>
          </div>
        </a>

        <div className="relative hidden flex-1 lg:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск: коляска, конструктор, боди…"
            className="w-full rounded-full border border-border bg-secondary/60 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-ring focus:bg-background"
          />
        </div>

        <nav className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary md:flex">
            <LogIn className="h-4 w-4" /> Войти
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full text-primary transition hover:bg-secondary md:hidden" aria-label="Войти">
            <LogIn className="h-5 w-5" />
          </button>
          <button className="hidden h-11 w-11 place-items-center rounded-full text-primary transition hover:bg-secondary sm:grid" aria-label="Избранное">
            <Heart className="h-5 w-5" />
          </button>
          <motion.button
            id="cart-icon-target"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Корзина</span>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="grid min-w-[22px] place-items-center rounded-full bg-cream px-1.5 text-xs font-bold text-primary"
              >
                {count}
              </motion.span>
            )}
          </motion.button>
        </nav>
      </div>

      <div className="border-t border-border/60 px-4 py-2 lg:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск по 5000+ товаров"
            className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-background"
          />
        </div>
      </div>
    </header>
  );
}
