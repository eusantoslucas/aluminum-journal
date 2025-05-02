import type { Article } from "@/lib/types"

// API key would typically be stored in environment variables
const NEWS_API_KEY = "demo-key" // Replace with your actual API key in production
const PEXELS_API_KEY = "demo-key" // Replace with your actual Pexels API key

interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: {
    source: {
      id: string | null
      name: string
    }
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string
  }[]
}

interface PexelsResponse {
  photos: {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: string
    photographer_id: number
    avg_color: string
    src: {
      original: string
      large2x: string
      large: string
      medium: string
      small: string
      portrait: string
      landscape: string
      tiny: string
    }
    liked: boolean
    alt: string
  }[]
  total_results: number
  page: number
  per_page: number
  next_page: string
}

// Function to fetch news from NewsAPI
export async function fetchNewsFromAPI(query = "aluminum OR aluminium", limit = 10): Promise<Article[]> {
  try {
    // In a real app, this would use your actual API key
    // For demo purposes, we'll use mock data to simulate the API response
    // const response = await fetch(
    //   `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=${limit}&apiKey=${NEWS_API_KEY}`
    // )
    // const data: NewsAPIResponse = await response.json()

    // Mock data to simulate API response
    const mockArticles = [
      {
        source: { id: "reuters", name: "Reuters" },
        author: "Maria Silva",
        title: "Preços do alumínio sobem com aumento da demanda global",
        description:
          "Os preços do alumínio subiram 2% esta semana devido ao aumento da demanda no setor de construção e automotivo.",
        url: "https://example.com/news/1",
        urlToImage: null, // We'll fetch from Pexels
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        content:
          "Os preços do alumínio no mercado internacional apresentaram alta significativa nesta semana, impulsionados pelo aumento da demanda nos setores de construção civil e automotivo. Analistas apontam que a recuperação econômica pós-pandemia está acelerando o consumo do metal em mercados-chave.",
      },
      {
        source: { id: "bloomberg", name: "Bloomberg" },
        author: "João Santos",
        title: "China reduz produção de alumínio devido a restrições energéticas",
        description:
          "Novas políticas de redução de emissões na China estão limitando a produção de alumínio, afetando o mercado global.",
        url: "https://example.com/news/2",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        content:
          "O governo chinês implementou novas restrições energéticas que estão afetando diretamente a produção de alumínio no país. Como maior produtor mundial, estas medidas têm potencial para causar impacto significativo nos preços globais do metal nos próximos meses.",
      },
      {
        source: { id: "valor", name: "Valor Econômico" },
        author: "Ana Oliveira",
        title: "Indústria brasileira de esquadrias de alumínio cresce 15% no primeiro semestre",
        description:
          "Setor de esquadrias de alumínio registra crescimento expressivo, impulsionado pelo aquecimento do mercado imobiliário.",
        url: "https://example.com/news/3",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        content:
          "A indústria brasileira de esquadrias de alumínio registrou crescimento de 15% no primeiro semestre de 2023, segundo dados da Associação Brasileira do Alumínio (ABAL). O resultado positivo é atribuído principalmente ao aquecimento do mercado imobiliário e à valorização de materiais sustentáveis na construção civil.",
      },
      {
        source: { id: "exame", name: "Exame" },
        author: "Carlos Mendes",
        title: "Novas tecnologias reduzem em 30% o consumo de energia na produção de alumínio",
        description:
          "Inovações tecnológicas estão transformando a indústria do alumínio, tornando-a mais eficiente e sustentável.",
        url: "https://example.com/news/4",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        content:
          "Empresas do setor de alumínio estão implementando novas tecnologias que prometem reduzir em até 30% o consumo de energia no processo produtivo. Estas inovações representam um avanço significativo para a sustentabilidade da indústria, que tradicionalmente é intensiva em energia.",
      },
      {
        source: { id: "folha", name: "Folha de São Paulo" },
        author: "Fernanda Lima",
        title: "Exportações de alumínio brasileiro crescem 8% no último trimestre",
        description:
          "Brasil aumenta sua participação no mercado internacional de alumínio, com destaque para produtos de maior valor agregado.",
        url: "https://example.com/news/5",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        content:
          "As exportações brasileiras de alumínio e seus derivados cresceram 8% no último trimestre, comparado ao mesmo período do ano anterior. O aumento foi impulsionado principalmente por produtos de maior valor agregado, como chapas e folhas para os setores de embalagens e transportes.",
      },
      {
        source: { id: "estadao", name: "Estadão" },
        author: "Roberto Alves",
        title: "Alumínio reciclado representa 35% do consumo nacional do metal",
        description:
          "Brasil se destaca na reciclagem de alumínio, com índices superiores à média mundial, gerando benefícios econômicos e ambientais.",
        url: "https://example.com/news/6",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
        content:
          "O alumínio reciclado já representa 35% do consumo total do metal no Brasil, segundo levantamento da Associação Brasileira do Alumínio (ABAL). O índice é superior à média mundial e gera economia significativa de energia, além de reduzir a emissão de gases de efeito estufa.",
      },
      {
        source: { id: "g1", name: "G1" },
        author: "Luciana Costa",
        title: "Alta do dólar pressiona custos da indústria de alumínio no Brasil",
        description:
          "Valorização da moeda americana afeta importação de matéria-prima e componentes para o setor de alumínio.",
        url: "https://example.com/news/7",
        urlToImage: null,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        content:
          "A recente valorização do dólar frente ao real está pressionando os custos da indústria brasileira de alumínio. Empresas do setor relatam aumento nos preços de matérias-primas e componentes importados, o que pode impactar os preços finais dos produtos nos próximos meses.",
      },
    ]

    // Convert the mock data to our Article format and fetch images for each
    const articles = await Promise.all(
      mockArticles.map(async (article) => {
        // Fetch a relevant image from Pexels
        const imageUrl = await fetchImageFromPexels(
          article.title.includes("alumínio") ? "aluminum" : "industry factory",
        )

        return {
          id: Math.random().toString(36).substring(2, 15),
          title: article.title,
          slug: article.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-"),
          excerpt: article.description,
          content: article.content,
          date: article.publishedAt,
          category: getCategoryFromTitle(article.title),
          image: imageUrl,
          source: article.source.name,
          author: article.author || "Equipe Editorial",
          readTime: Math.floor(Math.random() * 5) + 3, // Random read time between 3-8 minutes
        }
      }),
    )

    return articles.slice(0, limit)
  } catch (error) {
    console.error("Error fetching news:", error)
    return []
  }
}

// Function to fetch images from Pexels API
async function fetchImageFromPexels(query: string): Promise<string> {
  try {
    // In a real app, this would use your actual Pexels API key
    // For demo purposes, we'll use predefined image URLs
    // const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
    //   headers: {
    //     Authorization: PEXELS_API_KEY,
    //   },
    // })
    // const data: PexelsResponse = await response.json()
    // return data.photos[0]?.src.medium || "/placeholder.svg?height=400&width=600"

    // Predefined Pexels image URLs related to aluminum and industry
    const pexelsImages = [
      "https://images.pexels.com/photos/2553424/pexels-photo-2553424.jpeg", // Aluminum factory
      "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg", // Industrial machinery
      "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg", // Construction
      "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg", // Metal production
      "https://images.pexels.com/photos/2569842/pexels-photo-2569842.jpeg", // Industrial worker
      "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg", // Modern architecture
      "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg", // Metal sheets
    ]

    // Return a random image from the array
    return pexelsImages[Math.floor(Math.random() * pexelsImages.length)]
  } catch (error) {
    console.error("Error fetching image from Pexels:", error)
    return "/placeholder.svg?height=400&width=600"
  }
}

// Helper function to determine category based on article title
function getCategoryFromTitle(title: string): string {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("preço") || lowerTitle.includes("valor") || lowerTitle.includes("custo")) {
    return "LME"
  } else if (lowerTitle.includes("dólar") || lowerTitle.includes("câmbio") || lowerTitle.includes("moeda")) {
    return "Câmbio"
  } else if (lowerTitle.includes("energia") || lowerTitle.includes("elétric")) {
    return "Energia"
  } else if (lowerTitle.includes("import") || lowerTitle.includes("export")) {
    return "Importações"
  } else if (lowerTitle.includes("sustent") || lowerTitle.includes("recicl") || lowerTitle.includes("ambient")) {
    return "Sustentabilidade"
  } else if (lowerTitle.includes("tecnolog") || lowerTitle.includes("inovaç")) {
    return "Tecnologia"
  } else {
    return "Mercado"
  }
}
