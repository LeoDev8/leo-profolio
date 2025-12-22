import Link from "next/link";

export default function LangSwitch({ lang }: { lang: String }) {
  return (
    <div>
      <Link
        href={`/en`}
        className={
          lang === "en"
            ? "text-foreground font-bold font-times"
            : "hover:text-foreground font-times"
        }
      >
        English
      </Link>
      <span>/</span>
      <Link
        href={`/zh`}
        className={
          lang === "zh"
            ? "text-foreground font-bold font-kaiti"
            : "hover:text-foreground font-kaiti"
        }
      >
        简体中文
      </Link>
    </div>
  );
}
