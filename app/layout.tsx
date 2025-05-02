import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "aluminio.news - Notícias e Dados do Mercado de Alumínio",
  description:
    "Acompanhe em tempo real os preços do alumínio, cotação do dólar, custos de energia e tendências de importação que impactam o setor de esquadrias de alumínio.",
  keywords: "alumínio, LME, esquadrias, preço do alumínio, cotação do dólar, custo de energia, importação de alumínio",
  authors: [{ name: "aluminio.news" }],
  creator: "aluminio.news",
  publisher: "aluminio.news",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aluminio.news"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://aluminio.news",
    title: "aluminio.news - Notícias e Dados do Mercado de Alumínio",
    description:
      "Acompanhe em tempo real os preços do alumínio, cotação do dólar, custos de energia e tendências de importação.",
    siteName: "aluminio.news",
  },
  twitter: {
    card: "summary_large_image",
    title: "aluminio.news - Notícias e Dados do Mercado de Alumínio",
    description:
      "Acompanhe em tempo real os preços do alumínio, cotação do dólar, custos de energia e tendências de importação.",
    creator: "@aluminionews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans`}>
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
