import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Здравствуйте! Я ИИ-консультант магазина. Помогу подобрать товар по возрасту, бюджету или задаче. С чего начнём?" },
  ]);

  const send = () => {
    if (!text.trim()) return;
    const q = text.trim();
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, {
        role: "bot",
        text: "Спасибо! ИИ-консультант скоро подключится к системе и подберёт вам лучшие варианты по вашему запросу.",
      }]);
    }, 700);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] grid h-16 w-16 place-items-center rounded-full text-primary-foreground shadow-premium"
        style={{ background: "var(--gradient-primary)" }}
        aria-label="Открыть чат"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-cream text-primary">
          <Sparkles className="h-3 w-3" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="fixed bottom-6 right-6 z-[70] flex h-[560px] max-h-[80vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-card shadow-premium"
          >
            <header className="flex items-center justify-between px-5 py-4 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">ИИ-консультант</p>
                  <p className="text-xs text-white/80">Онлайн · отвечает мгновенно</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-card text-foreground shadow-soft"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 border-t border-border bg-card p-3"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишите сообщение…"
                className="flex-1 rounded-full bg-secondary px-4 py-3 text-sm outline-none focus:bg-muted"
              />
              <button className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
