// Deterministic soft SVG "photo" placeholder — premium looking, no bad AI images.
export function ProductThumb({ id, color, category }: { id: string; color: string; category: string }) {
  const seed = [...id].reduce((s, c) => s + c.charCodeAt(0), 0);
  const shape = seed % 4;
  const glyphs: Record<string, string> = {
    toys: "🧸", clothes: "👕", feeding: "🍼", care: "🛁",
    furniture: "🛏️", stroller: "🚼", books: "📚", sport: "🛴",
  };
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(circle at 30% 20%, #fff 0%, ${color} 70%)` }}
    >
      {shape === 0 && (
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/50" />
      )}
      {shape === 1 && (
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/40" />
      )}
      {shape === 2 && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.6),transparent_50%)]" />
      )}
      {shape === 3 && (
        <div className="absolute right-4 top-4 h-16 w-16 rounded-3xl bg-white/40" />
      )}
      <span className="relative text-6xl drop-shadow-sm">{glyphs[category] ?? "🎁"}</span>
    </div>
  );
}
