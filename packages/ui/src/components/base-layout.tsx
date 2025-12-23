import { DM_Sans, PT_Serif } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { Toaster } from "sonner";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

interface BaseLayoutProps extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export function BaseLayout({ children, ...props }: BaseLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ptSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          {...props}
        >
          {children}
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  );
}
