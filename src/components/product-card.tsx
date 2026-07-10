import { motion } from "framer-motion";
import { Building2, Heart, ShoppingBag, Star } from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/store-data";
import { ProductThumb } from "./product-thumb";

export function ProductCard({ product, onB2B }: { product: Product; onB2B: (p: Product) => void }) {
  const { add, setOpen, triggerFly } = useCart();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [liked, setLiked] = useState(false);

  const handleAdd = () => {
    add(product);
    const r = btnRef.current?.getBoundingClientRect();
    if (r) triggerFly({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setTimeout(() => setOpen(true), 400);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductThumb id={product.id} color={product.color} category={product.category} />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            product.badge.startsWith("-") ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
          }`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white"
          aria-label="В избранное"
        >
          <Heart className={`h-4 w-4 transition ${liked ? "fill-destructive text-destructive" : "text-primary"}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wider text-primary-soft">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-blush text-blush" />{product.rating.toFixed(1)}</span>
          <span>·</span>
          <span>{product.reviews} отзывов</span>
          <span>·</span>
          <span>{product.age}</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            ref={btnRef}
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
          >
            <ShoppingBag className="h-4 w-4" /> В корзину
          </button>
          <button
            onClick={() => onB2B(product)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-accent/40 py-2 text-xs font-semibold text-primary transition hover:bg-accent"
          >
            <Building2 className="h-3.5 w-3.5" /> Запросить оптовые цены
          </button>
        </div>
      </div>
    </motion.article>
  );
}
