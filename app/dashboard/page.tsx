import type { Metadata } from "next"
import DataDashboard from "@/components/data-dashboard"

export const metadata: Metadata = {
  title: "Painel de Dados - aluminio.news",
  description:
    "Visualize dados detalhados sobre preços do alumínio, cotação do dólar, custos de energia e tendências de importação com gráficos interativos.",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-gray-800">Painel de Dados</h1>

      <DataDashboard />
    </div>
  )
}
