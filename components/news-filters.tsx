"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

const categories = [
  { id: "all", name: "Todos" },
  { id: "lme", name: "LME" },
  { id: "currency", name: "Câmbio" },
  { id: "energy", name: "Energia" },
  { id: "imports", name: "Importações" },
]

const dateFilters = [
  { id: "24h", name: "Últimas 24h" },
  { id: "week", name: "Última semana" },
  { id: "month", name: "Último mês" },
  { id: "all", name: "Todos" },
]

export default function NewsFilters() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Buscar notícias..."
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <button type="submit" className="sr-only">
          Buscar
        </button>
      </form>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 mr-2">Categoria:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Data:</span>
          <div className="flex flex-wrap gap-2">
            {dateFilters.map((filter) => (
              <button
                key={filter.id}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedDate === filter.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedDate(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
