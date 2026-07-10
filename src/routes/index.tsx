import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Filter, Headphones, Shield, ShoppingBag, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero-family.jpg";
import { CartProvider } from "@/lib/cart-context";
import { categories, formatPrice, products, type Product } from "@/lib/store-data";
import { SiteHeader } from "@/components/site-header";
import { ProductCard } from "@/components/product-card";
import { CartDrawer } from "@/components/cart-drawer";
import { ChatWidget } from "@/components/chat-widget";
import { FlyToCart } from "@/components/fly-to-cart";
import { B2BModal } from "@/components/b2b-modal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Сайт для Юрия с YouDo — премиальный магазин детских товаров" },
      { name: "description", content: "B2B/B2C интернет-магазин детских товаров: каталог 5000+ SKU, оптовые цены, ИИ-консультант, быстрая доставка." },
      { property: "og:title", content: "Сайт для Юрия с YouDo — премиальный магазин детских товаров" },
      { property: "og:description", content: "B2B/B2C интернет-магазин детских товаров: каталог 5000+ SKU, оптовые цены, ИИ-консультант, быстрая доставка." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <CartProvider>
      <Store />
      <CartDrawer />
      <ChatWidget />
      <FlyToCart />
    </CartProvider>
  );
}

function Store() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [age, setAge] = useState<string>("all");
  const [sort, setSort] = useState<string>("popular");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [b2b, setB2b] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let r = products.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (age === "all" || p.age === age) &&
      p.price <= maxPrice &&
      (query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [cat, age, maxPrice, query, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader onSearch={setQuery} query={query} />
      <Hero />
      <TrustStrip />
      <Categories active={cat} onChange={setCat} />
      <section id="catalog" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-primary-soft">Каталог · 5000+ SKU</p>
            <h2 className="mt-1 truncate text-3xl font-bold text-primary sm:text-4xl">Товары для счастливого детства</h2>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="shrink-0 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium outline-none focus:border-ring"
          >
            <option value="popular">Популярные</option>
            <option value="price-asc">Дешевле</option>
            <option value="price-desc">Дороже</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-3xl border border-border bg-card p-5 lg:sticky lg:top-28">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-primary">Фильтры</h3>
            </div>
            <div className="space-y-5">
              <FilterBlock label="Возраст">
                <div className="flex flex-wrap gap-1.5">
                  <Chip active={age === "all"} onClick={() => setAge("all")}>Все</Chip>
                  {["0–6 мес", "6–12 мес", "1–3 года", "3–5 лет", "5–8 лет", "8+ лет"].map((a) => (
                    <Chip key={a} active={age === a} onClick={() => setAge(a)}>{a}</Chip>
                  ))}
                </div>
              </FilterBlock>
              <FilterBlock label={`Цена · до ${formatPrice(maxPrice)}`}>
                <input
                  type="range" min={990} max={15000} step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  className="w-full accent-primary"
                />
              </FilterBlock>
              <FilterBlock label="Категория">
                <div className="space-y-1.5">
                  <Chip active={cat === "all"} onClick={() => setCat("all")}>Все категории</Chip>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCat(c.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                        cat === c.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{c.emoji} {c.name}</span>
                      <span className={`text-xs ${cat === c.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{c.count}</span>
                    </button>
                  ))}
                </div>
              </FilterBlock>
            </div>
          </aside>

          <div>
            <p className="mb-4 text-sm text-muted-foreground">Найдено {filtered.length} товаров</p>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
                Ничего не найдено. Попробуйте изменить фильтры.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onB2B={setB2b} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <B2BBanner />
      <Footer />
      <B2BModal product={b2b} onClose={() => setB2b(null)} />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blush/40 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-premium">
          <img
            src={heroImg}
            width={1600}
            height={1200}
            alt="Счастливая семья с ребёнком в детской комнате"
            className="h-full w-full object-cover"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Доверяют семьи</p>
              <p className="text-sm font-bold text-primary">120 000+ покупателей</p>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cloud-shape bg-card p-8 shadow-premium sm:p-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              B2B / B2C · Полный цикл
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Премиальный интернет-магазин детских товаров
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Личный кабинет, админка, каталог 5&nbsp;000+ SKU, безопасная оплата и ИИ-консультант, который помогает подобрать товар за минуту.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: "🛒", top: "Каталог 5000+", sub: "мощный импорт" },
                { icon: "👥", top: "B2B / B2C", sub: "оптовые цены" },
                { icon: "🤖", top: "ИИ-чат", sub: "консультант" },
              ].map((f) => (
                <div key={f.top} className="rounded-2xl bg-secondary/60 p-3 text-center">
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-card text-lg shadow-soft">{f.icon}</div>
                  <p className="mt-2 text-xs font-bold text-primary">{f.top}</p>
                  <p className="text-[11px] text-muted-foreground">{f.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalog" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95">
                Открыть каталог <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#b2b" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-secondary">
                Оставить B2B-заявку
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Shield, top: "Безопасно и надёжно", sub: "SSL, PCI-DSS" },
    { icon: ShoppingBag, top: "Удобная админка", sub: "5000+ SKU в 1 клик" },
    { icon: Truck, top: "Онлайн-оплата и доставка", sub: "СДЭК · Boxberry · курьер" },
    { icon: Headphones, top: "Техническая поддержка", sub: "24/7 для B2B" },
  ];
  return (
    <section className="border-y border-border/70 bg-cream/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.top} className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-soft">
              <it.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-primary">{it.top}</p>
              <p className="truncate text-xs text-muted-foreground">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-primary-soft">Категории</p>
          <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">Всё, что нужно ребёнку</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <button
          onClick={() => onChange("all")}
          className={`rounded-2xl p-4 text-center transition ${active === "all" ? "bg-primary text-primary-foreground shadow-soft" : "bg-card hover:bg-secondary"}`}
        >
          <div className="text-3xl">✨</div>
          <p className="mt-2 text-sm font-semibold">Все</p>
        </button>
        {categories.map((c) => (
          <motion.button
            key={c.id}
            whileHover={{ y: -3 }}
            onClick={() => { onChange(c.id); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`rounded-2xl border border-border p-4 text-center transition ${
              active === c.id ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-card hover:bg-secondary"
            }`}
          >
            <div className="text-3xl">{c.emoji}</div>
            <p className="mt-2 truncate text-sm font-semibold">{c.name}</p>
            <p className={`text-[11px] ${active === c.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{c.count} товаров</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-soft">{label}</p>
      {children}
    </div>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-foreground hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}

function B2BBanner() {
  return (
    <section id="b2b" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16" style={{ background: "var(--gradient-primary)" }}>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cream/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="text-primary-foreground">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">Для магазинов</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Работаем с B2B: оптовые цены, отсрочка, персональный менеджер</h2>
            <p className="mt-4 max-w-xl text-white/85">
              Каталог из 5&nbsp;000+ SKU с быстрой выгрузкой в вашу учётную систему, EDI, прямые контракты с брендами. Оставьте заявку — пришлём прайс за 15 минут.
            </p>
          </div>
          <div className="rounded-3xl bg-card/95 p-6 shadow-premium backdrop-blur sm:p-8">
            <h3 className="text-lg font-bold text-primary">Заявка B2B</h3>
            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input required placeholder="Компания" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Имя" className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
                <input required type="tel" placeholder="Телефон" className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring" />
              </div>
              <button className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95">
                Получить оптовый прайс
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="font-display font-bold text-primary">Сайт для Юрия<br /><span className="text-xs font-normal text-muted-foreground">с YouDo</span></p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Премиальный B2B/B2C магазин детских товаров. Полный цикл: каталог, оплата, доставка, ИИ-консультант.</p>
        </div>
        {[
          { t: "Покупателям", l: ["Каталог", "Доставка", "Оплата", "Возврат", "Гарантии"] },
          { t: "Партнёрам", l: ["B2B-заявка", "Личный кабинет", "Условия оптовикам", "API / выгрузка"] },
          { t: "Контакты", l: ["+7 800 000 00 00", "hello@example.com", "Пн–Вс 9:00–21:00"] },
        ].map((c) => (
          <div key={c.t}>
            <p className="mb-3 text-sm font-bold text-primary">{c.t}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => <li key={i}><a href="#" className="hover:text-primary">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Сайт для Юрия с YouDo. Все права защищены.
      </div>
    </footer>
  );
}
