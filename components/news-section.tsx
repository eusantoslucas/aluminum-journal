import { fetchNews } from "@/lib/api"
import NewsCard from "@/components/news-card"
import FeaturedNewsCard from "@/components/featured-news-card"

type NewsSectionProps = {
  limit?: number
  featured?: boolean
}

export default async function NewsSection({ limit = 6, featured = false }: NewsSectionProps) {
  const news = await fetchNews(limit)

  if (featured && news.length > 0) {
    const featuredArticle = news[0]
    const otherArticles = news.slice(1)

    return (
      <div className="space-y-8">
        <FeaturedNewsCard article={featuredArticle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        <div className="flex justify-center">
          <a href="/news" className="btn btn-secondary">
            Carregar Mais
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      <div className="flex justify-center">
        <a href="/news" className="btn btn-secondary">
          Carregar Mais
        </a>
      </div>
    </div>
  )
}
