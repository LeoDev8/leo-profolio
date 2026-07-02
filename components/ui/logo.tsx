import Image from "next/image";
import Link from "next/link";

export default function Logo({ lang }: { lang: string }) {
  return (
    <div className="w-10 h-10 mx-1 shrink-0">
      <Link
        href={`/${lang}`}
        aria-label="Leo Profolio home"
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-glass-border bg-glass shadow-glass-inner backdrop-blur-sm transition-colors duration-motion hover:bg-glass-strong"
      >
        <Image
          src="/avatar/leo-avatar-brush.svg"
          alt="Leo Profolio"
          width={32}
          height={32}
          priority
          className="block h-8 w-8 dark:hidden"
        />
        <Image
          src="/avatar/leo-avatar-brush-dark.svg"
          alt="Leo Profolio"
          width={32}
          height={32}
          priority
          className="hidden h-8 w-8 dark:block"
        />
      </Link>
    </div>
  );
}
