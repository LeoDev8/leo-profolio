import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Leo Profolio",
  description: "Leo Profolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
