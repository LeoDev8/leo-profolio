// import Link from "next/link";

// const links = [
//   { name: "index", href: "/" },
//   { name: "profile", href: "/skill" },
//   { name: "works", href: "/project" },
//   { name: "writing", href: "/photo" },
//   { name: "contact", href: "/contact" },
// ];

// export default function NavBar() {
//   return (
//     <div className="">
//       {/* Logo */}
//       <div className="">
//         Leo <span className="">.</span>
//       </div>

//       {/* Navigation Options */}
//       <div className="">
//         {...Array(links.length)
//           .fill(0)
//           .map((_, index) => (
//             <Link key={index} href={links[index].href} className="">
//               {links[index].name}
//             </Link>
//           ))}
//       </div>

//       {/* More Function */}
//       <button className="">Log In</button>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Index", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Works", href: "/works" },
  { name: "Writing", href: "/writing" },
  { name: "Contact", href: "/contact" },
];

interface NavbarProps {
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
        {/* 1. Logo: Only some texts*/}
        <div className="shrink-0">
          <Link
            href={`/${lang}`}
            className="font-serif text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            Leo <span>.</span>
          </Link>
        </div>

        {/* 2. Navigation: hidden in the mobile */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const hrefWithLang = `/${lang}${
              link.href === "/" ? "" : link.href
            }`;

            const isActive =
              link.href === "/"
                ? pathname === `/${lang}`
                : pathname.startsWith(hrefWithLang);

            return (
              <li key={link.name}>
                <Link
                  href={hrefWithLang}
                  className={`relative block text-lg transition-all duration-300 ease-in-out hover:italic hover:text-gray-600 ${
                    isActive ? "text-black font-medium" : "text-gray-500"
                  }`}
                >
                  <span className="capitalize">{link.name}</span>

                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px bg-black transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }
                      `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. Right: language switch */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
          <Link
            href={`/en`}
            className={
              lang === "en" ? "text-black font-bold font-times" : "hover:text-black font-times"
            }
          >
            EN
          </Link>
          <span>/</span>
          <Link
            href={`/zh`}
            className={
              lang === "zh" ? "text-black font-bold font-kaiti" : "hover:text-black font-kaiti"
            }
          >
            中文
          </Link>
        </div>
      </div>
    </nav>
  );
}
