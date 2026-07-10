import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Building2, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/store-data";

export function B2BModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-premium"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-secondary"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
            {!sent ? (
              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary-soft">B2B заявка</p>
                    <h3 className="text-xl font-semibold text-primary">Оптовые цены</h3>
                  </div>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  Товар: <span className="font-medium text-foreground">{product.name}</span> — оставьте контакты, менеджер пришлёт прайс за 15 минут.
                </p>
                <form
                  className="space-y-3"
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                >
                  <input required placeholder="Название компании" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Ваше имя" className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                    <input required type="tel" placeholder="Телефон" className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                  </div>
                  <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                  <input placeholder="Планируемый объём, шт" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                  <button className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95">
                    Запросить оптовый прайс
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent text-primary"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Заявка отправлена</h3>
                <p className="mb-6 text-sm text-muted-foreground">Менеджер свяжется с вами в течение 15 минут.</p>
                <button onClick={onClose} className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Отлично</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
