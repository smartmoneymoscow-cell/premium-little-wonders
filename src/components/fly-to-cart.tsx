import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function FlyToCart() {
  const { flyKey, flyingFrom } = useCart();
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!flyingFrom || flyKey === 0) return;
    const el = document.getElementById("cart-icon-target");
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 750);
    return () => clearTimeout(t);
  }, [flyKey, flyingFrom]);

  return (
    <AnimatePresence>
      {visible && flyingFrom && target && (
        <motion.div
          key={flyKey}
          initial={{ x: flyingFrom.x - 24, y: flyingFrom.y - 24, scale: 1, opacity: 1 }}
          animate={{
            x: target.x - 24, y: target.y - 24,
            scale: 0.3, opacity: 0.8,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.5, 0, 0.75, 0.2] }}
          className="pointer-events-none fixed left-0 top-0 z-[200] grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-premium"
        >
          <ShoppingBag className="h-5 w-5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
