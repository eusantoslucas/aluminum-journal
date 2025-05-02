import { Suspense } from "react"
import Dashboard from "@/components/dashboard"
import NewsSection from "@/components/news-section"
import DashboardSkeleton from "@/components/skeletons/dashboard-skeleton"
import NewsSkeleton from "@/components/skeletons/news-skeleton"
import NewsletterSignup from "@/components/newsletter-signup"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section id="dashboard" className="mb-12">
        <h2 className="text-3xl font-bold font-heading mb-6 text-gray-800">Painel de Dados em Tempo Real</h2>
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </section>

      <div className="mb-12">
        <NewsletterSignup />
      </div>

      <section id="news" className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-heading text-gray-800">Notícias do Setor</h2>
          <a href="/news" className="text-blue-600 hover:text-blue-800 font-medium">
            Ver todas
          </a>
        </div>
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection featured limit={5} />
        </Suspense>
      </section>
    </div>
  )
}
