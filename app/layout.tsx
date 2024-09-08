import { Toaster} from "sonner"
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-providers";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

import localFont from "next/font/local";
import "./globals.css";






const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Botion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-schema: light)",
        url: "logo.svg",
        href: "logo.svg",
      },
      {
        media: "(prefers-color-schema: dark)",
        url: "logo-dark.svg",
        href: "logo-dark.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ConvexClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="botion-theme-2"
        >
          <Toaster position="bottom-center"/>
          <ModalProvider />
          {children}
        </ThemeProvider>
      </ConvexClientProvider>

      </body>
    </html>
  );
}
