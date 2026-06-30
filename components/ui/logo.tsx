import Image from "next/image";
import Link from "next/link";

export default function Logo({ lang }: { lang: string }) {
  return (
    <div className="w-10 h-10 mx-1 shrink-0">
      <Link
        href={`/${lang}`}
        aria-label="Leo Profolio home"
        className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-full"
      >
        <Image
          src="/avatar/leo-avatar-brush.svg"
          alt="Leo Profolio"
          width={36}
          height={36}
          priority
          className="block w-9 h-9 dark:hidden"
        />
        <Image
          src="/avatar/leo-avatar-brush-dark.svg"
          alt="Leo Profolio"
          width={36}
          height={36}
          priority
          className="hidden w-9 h-9 dark:block"
        />
      </Link>
    </div>
  );
}
