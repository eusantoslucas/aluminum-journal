import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/lib/types"
import { ShareButtons } from "@/components/share-buttons"

type NewsCardProps = {
  article: Article
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="card group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg?height=200&width=400"}
          alt={article.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className={`badge ${getCategoryBadgeClass(article.category)}`}>{article.category}</span>
          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">{article.source}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          <Link href={`/news/${article.slug}`} className="hover:text-accent-blue transition-colors">
            {article.title}
          </Link>
        </h3>

        <p className="text-aluminum-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>

        <div className="flex justify-between items-center text-xs text-aluminum-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(article.date)}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{article.readTime} min</span>
              </div>
            )}
          </div>

          <ShareButtons url={`/news/${article.slug}`} title={article.title} />
        </div>
      </div>
    </div>
  )
}

function getCategoryBadgeClass(category: string): string {
  switch (category.toLowerCase()) {
    case "lme":
      return "badge-blue"
    case "câmbio":
      return "badge-green"
    case "energia":
      return "badge-yellow"
    case "importações":
      return "badge-purple"
    case "sustentabilidade":
      return "badge-green"
    case "tecnologia":
      return "badge-blue"
    default:
      return "badge-blue"
  }
}
