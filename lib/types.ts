export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  category: string
  image: string
  source: string
  author?: string
  readTime?: number
}

export interface LMEData {
  current: number
  change: number
  history: number[]
  lastUpdated: string
  additionalData?: {
    cashBuyer: number
    cashSeller: number
    threeMonthBuyer: number
    threeMonthSeller: number
    stockLevel: number
    openInterest: number
  }
  historicalData?: {
    oneMonth: number
    threeMonths: number
    sixMonths: number
    oneYear: number
    fiveYears: number
  }
}

export interface ExchangeData {
  current: number
  change: number
  history: number[]
  lastUpdated: string
  additionalData?: {
    bid: number
    ask: number
    high24h: number
    low24h: number
    volume24h: number
  }
  historicalData?: {
    oneMonth: number
    threeMonths: number
    sixMonths: number
    oneYear: number
    fiveYears: number
  }
  relatedCurrencies?: {
    code: string
    rate: number
    change: number
  }[]
}

export interface ElectricityData {
  current: number
  change: number
  history: number[]
  lastUpdated: string
  additionalData?: {
    residentialRate: number
    commercialRate: number
    industrialRate: number
    generationCost: number
    transmissionCost: number
    distributionCost: number
    taxes: number
  }
  regionalData?: {
    region: string
    rate: number
    change: number
  }[]
  historicalData?: {
    oneMonth: number
    threeMonths: number
    sixMonths: number
    oneYear: number
    fiveYears: number
  }
}

export interface ImportData {
  average: number
  change: number
  countries: {
    country: string
    price: number
    change: number
    volume?: number
    marketShare?: number
  }[]
  lastUpdated: string
  historicalData?: {
    oneMonth: number
    threeMonths: number
    sixMonths: number
    oneYear: number
    fiveYears: number
  }
  categories?: {
    name: string
    price: number
    change: number
    volume: number
  }[]
}

export type TimeRange = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "5y" | "all"

export type DataView = "chart" | "table" | "summary"

export type ChartType = "line" | "bar" | "area" | "candlestick"
