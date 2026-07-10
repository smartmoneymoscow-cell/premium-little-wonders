export type Category = { id: string; name: string; emoji: string; count: number };
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  age: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  color: string;
  image: string;
};

export const categories: Category[] = [
  { id: "toys", name: "Игрушки", emoji: "🧸", count: 1240 },
  { id: "clothes", name: "Одежда", emoji: "👕", count: 890 },
  { id: "feeding", name: "Кормление", emoji: "🍼", count: 420 },
  { id: "care", name: "Уход и гигиена", emoji: "🛁", count: 560 },
  { id: "furniture", name: "Мебель", emoji: "🛏️", count: 210 },
  { id: "stroller", name: "Коляски и авто", emoji: "🚼", count: 180 },
  { id: "books", name: "Книги", emoji: "📚", count: 640 },
  { id: "sport", name: "Активность", emoji: "🛴", count: 320 },
];

const names = [
  "Деревянный конструктор", "Мягкий мишка", "Развивающий коврик", "Комплект боди",
  "Ночник-звёздное небо", "Прорезыватель силиконовый", "Пирамидка радуга", "Комбинезон флисовый",
  "Соска ортодонтическая", "Погремушка-подвеска", "Стульчик для кормления", "Балансборд",
  "Игровая палатка", "Набор кубиков", "Комплект пелёнок", "Слюнявчик хлопковый",
  "Велосипед беговел", "Кукла ручной работы", "Мобиль музыкальный", "Настольная игра",
  "Пижама муслиновая", "Ботиночки первые шаги", "Рюкзак дошкольника", "Термос детский",
];
const brands = ["HappyBaby", "Scandi Home", "NordiKids", "Little Oak", "MamaBear", "Wooden Story"];
const colors = ["#dfe9f5", "#f5e6d8", "#e8d8f0", "#d8ecdd", "#f7dcdc", "#e6e0d3"];
const ages = ["0–6 мес", "6–12 мес", "1–3 года", "3–5 лет", "5–8 лет", "8+ лет"];
const badges = [undefined, "Хит", "Новинка", "-15%", undefined, undefined];

export const products: Product[] = Array.from({ length: 60 }).map((_, i) => {
  const cat = categories[i % categories.length];
  const price = 990 + ((i * 137) % 12000);
  const hasOld = i % 4 === 0;
  return {
    id: `p${i + 1}`,
    name: `${names[i % names.length]} №${i + 1}`,
    brand: brands[i % brands.length],
    category: cat.id,
    age: ages[i % ages.length],
    price,
    oldPrice: hasOld ? Math.round(price * 1.25) : undefined,
    rating: 4 + ((i * 13) % 10) / 10,
    reviews: 12 + ((i * 7) % 240),
    badge: badges[i % badges.length],
    color: colors[i % colors.length],
    image: "",
  };
});

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";
