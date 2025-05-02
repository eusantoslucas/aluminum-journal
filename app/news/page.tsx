import { Suspense } from "react"
import NewsSection from "@/components/news-section"
import NewsFilters from "@/components/news-filters"
import NewsSkeleton from "@/components/skeletons/news-skeleton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notícias - Jornal do Alumínio",
  description:
    "Últimas notícias e atualizações sobre o mercado de alumínio, preços LME, cotação do dólar, custos de energia e tendências de importação.",
}

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-gray-800">Notícias do Setor de Alumínio</h1>

      <NewsFilters />

      <Suspense fallback={<NewsSkeleton count={12} />}>
        <NewsSection limit={12} />
      </Suspense>
    </div>
  )
}
