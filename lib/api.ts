import type { Article, LMEData, ExchangeData, ElectricityData, ImportData } from "@/lib/types"
import { fetchNewsFromAPI } from "@/lib/news-service"

// More realistic LME aluminum price data
export async function fetchLMEPrice(): Promise<LMEData> {
  // In a real app, this would fetch from an API like:
  // const response = await fetch('https://api.example.com/lme-prices', { next: { revalidate: 300 } })

  return {
    current: 2387.5, // Current LME price in USD/ton
    change: -1.2, // Daily percentage change
    history: [2412.25, 2405.75, 2398.5, 2410.25, 2425.0, 2418.75, 2405.5, 2392.25, 2401.75, 2395.25, 2390.5, 2387.5],
    lastUpdated: new Date().toISOString(),
    additionalData: {
      cashBuyer: 2386.0,
      cashSeller: 2387.0,
      threeMonthBuyer: 2410.0,
      threeMonthSeller: 2411.0,
      stockLevel: 504325, // Metric tons
      openInterest: 711250, // Contracts
    },
    historicalData: {
      oneMonth: -2.8,
      threeMonths: 1.5,
      sixMonths: -3.2,
      oneYear: 5.7,
      fiveYears: 12.3,
    },
  }
}

// More realistic USD/BRL exchange rate data
export async function fetchExchangeRate(): Promise<ExchangeData> {
  // In a real app, this would fetch from an API like:
  // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')

  return {
    current: 5.18, // Current USD/BRL rate
    change: 0.3, // Daily percentage change
    history: [5.21, 5.19, 5.22, 5.25, 5.23, 5.2, 5.17, 5.15, 5.18, 5.19, 5.17, 5.18],
    lastUpdated: new Date().toISOString(),
    additionalData: {
      bid: 5.175,
      ask: 5.185,
      high24h: 5.26,
      low24h: 5.14,
      volume24h: 4.2, // Billion USD
    },
    historicalData: {
      oneMonth: 1.2,
      threeMonths: -2.5,
      sixMonths: 3.8,
      oneYear: -1.7,
      fiveYears: 28.4,
    },
    relatedCurrencies: [
      { code: "EUR/BRL", rate: 5.62, change: 0.2 },
      { code: "GBP/BRL", rate: 6.58, change: -0.1 },
      { code: "JPY/BRL", rate: 0.034, change: 0.5 },
      { code: "CNY/BRL", rate: 0.72, change: 0.4 },
    ],
  }
}

// More realistic electricity cost data for Brazil
export async function fetchElectricityCost(): Promise<ElectricityData> {
  // In a real app, this would fetch from an API or scrape from a source like ANEEL

  return {
    current: 0.78, // Current industrial electricity cost in BRL/kWh
    change: 2.6, // Monthly percentage change
    history: [0.71, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.76, 0.77, 0.77, 0.78, 0.78],
    lastUpdated: new Date().toISOString(),
    additionalData: {
      residentialRate: 0.92, // BRL/kWh
      commercialRate: 0.85, // BRL/kWh
      industrialRate: 0.78, // BRL/kWh
      generationCost: 0.31, // BRL/kWh
      transmissionCost: 0.12, // BRL/kWh
      distributionCost: 0.18, // BRL/kWh
      taxes: 0.17, // BRL/kWh
    },
    regionalData: [
      { region: "Sudeste", rate: 0.78, change: 2.6 },
      { region: "Sul", rate: 0.76, change: 2.4 },
      { region: "Nordeste", rate: 0.81, change: 2.8 },
      { region: "Norte", rate: 0.83, change: 3.1 },
      { region: "Centro-Oeste", rate: 0.79, change: 2.7 },
    ],
    historicalData: {
      oneMonth: 1.3,
      threeMonths: 3.8,
      sixMonths: 6.2,
      oneYear: 9.7,
      fiveYears: 42.5,
    },
  }
}

// More realistic aluminum import data
export async function fetchImportPrices(): Promise<ImportData> {
  // In a real app, this would fetch from an API like UN Comtrade

  return {
    average: 2485, // Average import price in USD/ton
    change: 0.8, // Monthly percentage change
    countries: [
      { country: "China", price: 2320, change: 1.2, volume: 12500, marketShare: 38.5 },
      { country: "Rússia", price: 2410, change: 0.5, volume: 8200, marketShare: 25.3 },
      { country: "EUA", price: 2580, change: -0.3, volume: 4100, marketShare: 12.6 },
      { country: "Canadá", price: 2530, change: -0.8, volume: 3800, marketShare: 11.7 },
      { country: "Emirados Árabes", price: 2490, change: 1.5, volume: 2400, marketShare: 7.4 },
      { country: "Outros", price: 2570, change: 0.9, volume: 1450, marketShare: 4.5 },
    ],
    lastUpdated: new Date().toISOString(),
    historicalData: {
      oneMonth: 0.8,
      threeMonths: -1.2,
      sixMonths: 2.5,
      oneYear: 4.3,
      fiveYears: 15.8,
    },
    categories: [
      { name: "Alumínio Primário", price: 2485, change: 0.8, volume: 18200 },
      { name: "Ligas de Alumínio", price: 2720, change: 1.2, volume: 8500 },
      { name: "Produtos Semi-acabados", price: 3150, change: 0.5, volume: 5750 },
    ],
  }
}

// Fetch news articles from the news API
export async function fetchNews(limit = 6, category?: string, timeframe?: string): Promise<Article[]> {
  // Get news from our news service
  let articles = await fetchNewsFromAPI("aluminum OR aluminium OR esquadrias", limit * 2)

  // Filter by category if provided
  if (category && category !== "all") {
    articles = articles.filter((article) => article.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by timeframe if provided
  if (timeframe) {
    const now = new Date()
    const cutoffDate = new Date()

    switch (timeframe) {
      case "24h":
        cutoffDate.setDate(now.getDate() - 1)
        break
      case "week":
        cutoffDate.setDate(now.getDate() - 7)
        break
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      default:
        // No filtering for "all"
        break
    }

    if (timeframe !== "all") {
      articles = articles.filter((article) => new Date(article.date) >= cutoffDate)
    }
  }

  return articles.slice(0, limit)
}
