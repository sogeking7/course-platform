import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "../../next-auth.config";
import { TokenHandler } from "@/components/TokenHandler";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shoqan-edu.kz"),
  keywords: [
    "shoqan",
    "shoqan-edu",
    "shoqan education",
    "shoqan platform",
    "learning",
    "shoqan kz",
  ],
  title: {
    default: "Shoqan Education",
    template: "%s - Shoqan Education",
  },
  openGraph: {
    title: "Shoqan Education",
    description:
      "Shoqan-edu.kz-тек қана еліміздің емес,әлем бойынша ең үздік мектептерге түсуге арналған керемет дайындық үлгісін ұсынады!🌍📚",
    type: "website",
    locale: "kk_KZ",
    url: "https://www.shoqan-edu.kz",
    siteName: "ShoqanEdu",
  },
  description:
    "Shoqan-edu.kz-тек қана еліміздің емес,әлем бойынша ең үздік мектептерге түсуге арналған керемет дайындық үлгісін ұсынады!🌍📚",
  verification: {
    google: "kUeM3WNtUXMoBtgpz2HAknDwHEkJVK1DtE46N8dO7w",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Uncomment the redirect if you want to force users to sign in
    // redirect("/auth/signin");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          {/* Uncomment and configure ThemeProvider as needed */}
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          > */}
          {children}
          <TokenHandler />
          {/* </ThemeProvider> */}
        </Providers>
      </body>
    </html>
  );
}
