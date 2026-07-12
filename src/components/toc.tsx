import { useEffect, useState } from "react";

export function TableOfContents() {
  const [headings, setHeadings] = useState<{ text: string; id: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const found = Array.from(document.querySelectorAll("article h2, article h3"))
      .map((h: any) => ({ text: h.innerText, id: h.id, level: Number(h.tagName[1]) }));
    setHeadings(found);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );
    found.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="lg:sticky top-28">
      <h3 className="eyebrow mb-3">On this page</h3>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`transition ${h.id === activeId ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
              style={{ paddingLeft: `${(h.level - 2) * 0.75}rem` }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}