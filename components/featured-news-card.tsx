import Image from "next/image"
import { Calendar, Share2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/lib/types"

type FeaturedNewsCardProps = {
  article: Article
}

export default function FeaturedNewsCard({ article }: FeaturedNewsCardProps) {
  return (
    <div className="card group overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg?height=400&width=600"}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
          <div className="absolute bottom-3 left-3 right-3 md:hidden">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="hidden md:block mb-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">
              {article.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3">
            <a href={`/news/${article.slug}`} className="hover:text-blue-600 transition-colors">
              {article.title}
            </a>
          </h3>

          <p className="text-gray-600 mb-4">{article.excerpt}</p>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(article.date)}</span>
            </div>

            <div className="flex space-x-3">
              <button aria-label="Compartilhar no Twitter" className="hover:text-blue-600 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <a href={`/news/${article.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
              Ler mais →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
