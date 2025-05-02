import { DataWidget } from "@/components/data-widget"
import { fetchLMEPrice, fetchExchangeRate, fetchElectricityCost, fetchImportPrices } from "@/lib/api"

export default async function Dashboard() {
  // Fetch data in parallel
  const [lmeData, exchangeData, electricityData, importData] = await Promise.all([
    fetchLMEPrice(),
    fetchExchangeRate(),
    fetchElectricityCost(),
    fetchImportPrices(),
  ])

  // Format last updated timestamps
  const formatLastUpdated = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
      <DataWidget
        title="Preço LME Alumínio"
        value={`$${lmeData.current.toFixed(2)}/ton`}
        change={lmeData.change}
        sparklineData={lmeData.history}
        icon="dollar"
        lastUpdated={formatLastUpdated(lmeData.lastUpdated)}
      />

      <DataWidget
        title="Cotação USD/BRL"
        value={`1 USD = R$ ${exchangeData.current.toFixed(2)}`}
        change={exchangeData.change}
        sparklineData={exchangeData.history}
        icon="currency"
        lastUpdated={formatLastUpdated(exchangeData.lastUpdated)}
      />

      <DataWidget
        title="Custo de Energia"
        value={`R$ ${electricityData.current.toFixed(2)}/kWh`}
        change={electricityData.change}
        sparklineData={electricityData.history}
        icon="lightning"
        lastUpdated={formatLastUpdated(electricityData.lastUpdated)}
      />

      <DataWidget
        title="Importação de Alumínio"
        value={`$${importData.average.toFixed(2)}/ton`}
        change={importData.change}
        tableData={importData.countries.map((country) => ({
          country: country.country,
          price: country.price,
          change: country.change,
        }))}
        icon="truck"
        lastUpdated={formatLastUpdated(importData.lastUpdated)}
      />
    </div>
  )
}
