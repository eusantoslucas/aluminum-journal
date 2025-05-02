"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Info, BarChart3, LineChartIcon, TableIcon, Calendar, Filter, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import type { TimeRange, ChartType, DataView } from "@/lib/types"
import { DataDetailPanel } from "@/components/data-detail-panel"

// Mock data for the charts
const lmeData = [
  { date: "Jan", price: 2412.25, volume: 125000, open: 2400, high: 2450, low: 2380, close: 2412.25 },
  { date: "Fev", price: 2405.75, volume: 132000, open: 2412, high: 2430, low: 2390, close: 2405.75 },
  { date: "Mar", price: 2398.5, volume: 128000, open: 2405, high: 2420, low: 2380, close: 2398.5 },
  { date: "Abr", price: 2410.25, volume: 135000, open: 2398, high: 2425, low: 2390, close: 2410.25 },
  { date: "Mai", price: 2425.0, volume: 142000, open: 2410, high: 2440, low: 2405, close: 2425.0 },
  { date: "Jun", price: 2418.75, volume: 138000, open: 2425, high: 2435, low: 2410, close: 2418.75 },
  { date: "Jul", price: 2405.5, volume: 130000, open: 2418, high: 2425, low: 2395, close: 2405.5 },
  { date: "Ago", price: 2392.25, volume: 125000, open: 2405, high: 2415, low: 2385, close: 2392.25 },
  { date: "Set", price: 2401.75, volume: 132000, open: 2392, high: 2410, low: 2385, close: 2401.75 },
  { date: "Out", price: 2395.25, volume: 128000, open: 2401, high: 2415, low: 2390, close: 2395.25 },
  { date: "Nov", price: 2390.5, volume: 122000, open: 2395, high: 2405, low: 2380, close: 2390.5 },
  { date: "Dez", price: 2387.5, volume: 120000, open: 2390, high: 2400, low: 2375, close: 2387.5 },
]

const exchangeData = [
  { date: "Jan", rate: 5.21, volume: 3.8 },
  { date: "Fev", rate: 5.19, volume: 4.1 },
  { date: "Mar", rate: 5.22, volume: 3.9 },
  { date: "Abr", rate: 5.25, volume: 4.2 },
  { date: "Mai", rate: 5.23, volume: 4.0 },
  { date: "Jun", rate: 5.2, volume: 3.7 },
  { date: "Jul", rate: 5.17, volume: 3.5 },
  { date: "Ago", rate: 5.15, volume: 3.8 },
  { date: "Set", rate: 5.18, volume: 4.0 },
  { date: "Out", rate: 5.19, volume: 4.1 },
  { date: "Nov", rate: 5.17, volume: 3.9 },
  { date: "Dez", rate: 5.18, volume: 4.2 },
]

const electricityData = [
  { date: "Jan", cost: 0.71, demand: 68.5 },
  { date: "Fev", cost: 0.71, demand: 69.2 },
  { date: "Mar", cost: 0.72, demand: 67.8 },
  { date: "Abr", cost: 0.73, demand: 66.5 },
  { date: "Mai", cost: 0.74, demand: 65.3 },
  { date: "Jun", cost: 0.75, demand: 64.8 },
  { date: "Jul", cost: 0.76, demand: 65.2 },
  { date: "Ago", cost: 0.76, demand: 66.7 },
  { date: "Set", cost: 0.77, demand: 67.9 },
  { date: "Out", cost: 0.77, demand: 68.4 },
  { date: "Nov", cost: 0.78, demand: 69.1 },
  { date: "Dez", cost: 0.78, demand: 70.2 },
]

const importData = [
  { country: "China", value: 12500, price: 2320 },
  { country: "Rússia", value: 8200, price: 2410 },
  { country: "EUA", value: 4100, price: 2580 },
  { country: "Canadá", value: 3800, price: 2530 },
  { country: "Emirados Árabes", value: 2400, price: 2490 },
  { country: "Outros", value: 1450, price: 2570 },
]

const importCategoryData = [
  { name: "Alumínio Primário", value: 18200, price: 2485 },
  { name: "Ligas de Alumínio", value: 8500, price: 2720 },
  { name: "Produtos Semi-acabados", value: 5750, price: 3150 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

const timeRanges: { id: TimeRange; name: string }[] = [
  { id: "1d", name: "1 dia" },
  { id: "1w", name: "1 semana" },
  { id: "1m", name: "1 mês" },
  { id: "3m", name: "3 meses" },
  { id: "6m", name: "6 meses" },
  { id: "1y", name: "1 ano" },
  { id: "5y", name: "5 anos" },
  { id: "all", name: "Tudo" },
]

const chartTypes: { id: ChartType; name: string; icon: React.ReactNode }[] = [
  { id: "line", name: "Linha", icon: <LineChartIcon size={16} /> },
  { id: "bar", name: "Barra", icon: <BarChart3 size={16} /> },
  { id: "area", name: "Área", icon: <LineChartIcon size={16} /> },
  { id: "candlestick", name: "Candlestick", icon: <BarChart3 size={16} /> },
]

const dataViews: { id: DataView; name: string; icon: React.ReactNode }[] = [
  { id: "chart", name: "Gráfico", icon: <LineChartIcon size={16} /> },
  { id: "table", name: "Tabela", icon: <TableIcon size={16} /> },
  { id: "summary", name: "Resumo", icon: <Info size={16} /> },
]

// Componente de notificação simples
function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-md animate-fade-in ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {type === 'success' ? <CheckCircle className="mr-2" size={20} /> : <AlertCircle className="mr-2" size={20} />}
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        &times;
      </button>
    </div>
  );
}

export default function DataDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1y")
  const [chartType, setChartType] = useState<ChartType>("line")
  const [dataView, setDataView] = useState<DataView>("chart")
  const [showDetails, setShowDetails] = useState(false)
  const [detailsData, setDetailsData] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [compareWith, setCompareWith] = useState<string | null>(null)
  const [notification, setNotification] = useState<{message: string; type: 'success' | 'error'} | null>(null)

  const handleDownload = (dataType: string) => {
    setIsRefreshing(true)
    
    // Determinar quais dados baixar com base no tipo
    let dataToDownload: any[] = [];
    let fileName = '';
    let headers: string[] = [];
    
    switch(dataType) {
      case 'lme':
        dataToDownload = lmeData;
        fileName = 'preco-aluminio-lme';
        headers = ['Data', 'Preço (USD/ton)', 'Volume', 'Abertura', 'Máxima', 'Mínima', 'Fechamento'];
        break;
      case 'exchange':
        dataToDownload = exchangeData;
        fileName = 'cotacao-dolar-real';
        headers = ['Data', 'Taxa (BRL)', 'Volume'];
        break;
      case 'electricity':
        dataToDownload = electricityData;
        fileName = 'custo-energia';
        headers = ['Data', 'Custo (BRL/kWh)', 'Demanda'];
        break;
      case 'imports':
        dataToDownload = importData;
        fileName = 'importacao-aluminio';
        headers = ['País', 'Valor', 'Preço'];
        break;
    }
    
    // Gerar conteúdo CSV
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    
    // Adicionar linhas de dados
    dataToDownload.forEach(item => {
      let row = [];
      if ('date' in item) row.push(item.date);
      if ('country' in item) row.push(item.country);
      if ('price' in item) row.push(item.price);
      if ('rate' in item) row.push(item.rate);
      if ('cost' in item) row.push(item.cost);
      if ('value' in item) row.push(item.value);
      if ('volume' in item) row.push(item.volume);
      if ('open' in item) row.push(item.open);
      if ('high' in item) row.push(item.high);
      if ('low' in item) row.push(item.low);
      if ('close' in item) row.push(item.close);
      if ('demand' in item) row.push(item.demand);
      
      csvContent += row.join(',') + '\n';
    });
    
    // Criar e acionar o download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${fileName}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    // Simular um pequeno atraso para mostrar o indicador de carregamento
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      setIsRefreshing(false);
      
      // Mostrar notificação de sucesso
      setNotification({
        message: `Dados de ${dataType} baixados com sucesso!`,
        type: 'success'
      });
    }, 800);
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulação de chamada às APIs reais
      // Em um ambiente de produção, estas chamadas seriam para endpoints reais
      const [lmeData, exchangeData, electricityData, importData] = await Promise.all([
        fetch('/api/lme-price').then(res => res.ok ? res.json() : Promise.reject('Falha ao buscar dados LME')).catch(() => null),
        fetch('/api/exchange-rate').then(res => res.ok ? res.json() : Promise.reject('Falha ao buscar dados de câmbio')).catch(() => null),
        fetch('/api/electricity-cost').then(res => res.ok ? res.json() : Promise.reject('Falha ao buscar dados de energia')).catch(() => null),
        fetch('/api/import-prices').then(res => res.ok ? res.json() : Promise.reject('Falha ao buscar dados de importação')).catch(() => null)
      ])
      
      // Atualizar os dados apenas se as chamadas forem bem-sucedidas
      // Como estamos em modo de demonstração, não atualizamos os dados realmente
      console.log('Dados atualizados com sucesso:', { lmeData, exchangeData, electricityData, importData })
      
      // Mostrar notificação de sucesso
      setNotification({
        message: 'Dados atualizados com sucesso!',
        type: 'success'
      })
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      // Mostrar notificação de erro
      setNotification({
        message: 'Erro ao atualizar dados. Tente novamente mais tarde.',
        type: 'error'
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleShowDetails = (data: any) => {
    // Simular um pequeno atraso para mostrar o indicador de carregamento
    setIsRefreshing(true);
    
    // Em um ambiente de produção, aqui poderíamos buscar dados detalhados adicionais da API
    setTimeout(() => {
      // Enriquecer os dados com informações adicionais para o painel de detalhes
      const enrichedData = {
        ...data,
        // Adicionar dados extras que seriam obtidos de uma API real
        lastUpdated: new Date().toLocaleString('pt-BR'),
        forecast: data.price ? data.price * (1 + (Math.random() * 0.1 - 0.05)) : 
                  data.rate ? data.rate * (1 + (Math.random() * 0.1 - 0.05)) : 
                  data.cost ? data.cost * (1 + (Math.random() * 0.1 - 0.05)) : 
                  data.value * (1 + (Math.random() * 0.1 - 0.05)),
        marketAnalysis: data.price ? 
          `O preço do alumínio está ${data.price > 2400 ? 'acima' : 'abaixo'} da média histórica de $2,400.00/ton.` :
          data.rate ? 
          `A taxa de câmbio está ${data.rate > 5.2 ? 'acima' : 'abaixo'} da média histórica de R$ 5,20.` :
          data.cost ? 
          `O custo de energia está ${data.cost > 0.75 ? 'acima' : 'abaixo'} da média histórica de R$ 0,75/kWh.` :
          `O volume de importação está dentro da média histórica.`
      };
      
      setDetailsData(enrichedData);
      setShowDetails(true);
      setIsRefreshing(false);
    }, 600);
  }

  const renderChart = (data: any[], type: ChartType, xKey: string, yKey: string, name: string, color: string) => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis domain={["auto", "auto"]} />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={color} activeDot={{ r: 8 }} name={name} />
          </LineChart>
        )
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis domain={["auto", "auto"]} />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey={yKey} fill={color} name={name} />
          </BarChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis domain={["auto", "auto"]} />
            <RechartsTooltip />
            <Legend />
            <Area type="monotone" dataKey={yKey} stroke={color} fill={`${color}33`} name={name} />
          </AreaChart>
        )
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis domain={["auto", "auto"]} />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={color} activeDot={{ r: 8 }} name={name} />
          </LineChart>
        )
    }
  }

  const renderDataView = (
    data: any[],
    type: DataView,
    chartType: ChartType,
    xKey: string,
    yKey: string,
    name: string,
    color: string,
  ) => {
    switch (type) {
      case "chart":
        return renderChart(data, chartType, xKey, yKey, name, color)
      case "table":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {name}
                  </th>
                  {data[0] &&
                    Object.keys(data[0])
                      .filter((key) => key !== xKey && key !== yKey)
                      .map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item[xKey]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item[yKey]}</td>
                    {Object.keys(item)
                      .filter((key) => key !== xKey && key !== yKey)
                      .map((key) => (
                        <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "summary":
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Estatísticas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mínimo</p>
                  <p className="font-medium">{Math.min(...data.map((item) => item[yKey]))}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Máximo</p>
                  <p className="font-medium">{Math.max(...data.map((item) => item[yKey]))}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Média</p>
                  <p className="font-medium">
                    {(data.reduce((acc, item) => acc + item[yKey], 0) / data.length).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Variação</p>
                  <p className="font-medium">
                    {(((data[data.length - 1][yKey] - data[0][yKey]) / data[0][yKey]) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Tendência</h4>
              <p className="text-sm text-gray-600">
                {data[data.length - 1][yKey] > data[0][yKey]
                  ? `O valor de ${name.toLowerCase()} apresenta tendência de alta nos últimos períodos.`
                  : `O valor de ${name.toLowerCase()} apresenta tendência de queda nos últimos períodos.`}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                A variação percentual foi de{" "}
                {(((data[data.length - 1][yKey] - data[0][yKey]) / data[0][yKey]) * 100).toFixed(2)}% no período
                analisado.
              </p>
            </div>
          </div>
        )
      default:
        return renderChart(data, chartType, xKey, yKey, name, color)
    }
  }

  return (
    <div className="space-y-8">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      <Tabs defaultValue="lme">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList className="mb-0">
            <TabsTrigger value="lme">Preço LME</TabsTrigger>
            <TabsTrigger value="exchange">USD/BRL</TabsTrigger>
            <TabsTrigger value="electricity">Energia</TabsTrigger>
            <TabsTrigger value="imports">Importações</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              disabled={isRefreshing}
            >
              <Filter size={16} className="mr-1" />
              Filtros
            </button>

            <button
              onClick={handleRefresh}
              className={`flex items-center text-sm px-3 py-1.5 rounded-md ${isRefreshing ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              disabled={isRefreshing}
            >
              <RefreshCw size={16} className={`mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                <div className="flex space-x-2">
                  <select
                    className="form-input py-1 px-2 text-sm"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  >
                    {timeRanges.map((range) => (
                      <option key={range.id} value={range.id}>
                        {range.name}
                      </option>
                    ))}
                  </select>

                  <button className="flex items-center text-sm px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Calendar size={16} className="mr-1" />
                    Personalizado
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visualização</label>
                <div className="flex space-x-1">
                  {dataViews.map((view) => (
                    <button
                      key={view.id}
                      className={`flex items-center text-sm px-3 py-1 rounded-md ${
                        dataView === view.id
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setDataView(view.id)}
                    >
                      {view.icon}
                      <span className="ml-1">{view.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {dataView === "chart" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Gráfico</label>
                  <div className="flex space-x-1">
                    {chartTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`flex items-center text-sm px-3 py-1 rounded-md ${
                          chartType === type.id
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setChartType(type.id)}
                      >
                        {type.icon}
                        <span className="ml-1">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comparar com</label>
              <select
                className="form-input py-1 px-2 text-sm"
                value={compareWith || ""}
                onChange={(e) => setCompareWith(e.target.value || null)}
              >
                <option value="">Nenhum</option>
                <option value="previous_period">Período Anterior</option>
                <option value="previous_year">Ano Anterior</option>
                <option value="forecast">Previsão</option>
              </select>
            </div>
          </div>
        )}

        <TabsContent value="lme" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Preço do Alumínio LME (USD/ton)</h3>
              <button
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => handleDownload("lme")}
              >
                <Download size={16} className="mr-1" />
                Baixar dados
              </button>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {renderDataView(lmeData, dataView, chartType, "date", "price", "Preço (USD/ton)", "#3b82f6")}
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
              <div className="flex items-start">
                <Info size={16} className="mr-2 mt-0.5 text-blue-600" />
                <p>
                  Os preços do alumínio LME apresentaram uma tendência de queda nos últimos meses, com uma redução de
                  1.2% no último dia. A média de preço nos últimos 12 meses foi de $2,403.40 por tonelada, com um pico
                  de $2,425.00 em maio.
                </p>
              </div>
            </div>
          </div>

          {showDetails && detailsData && <DataDetailPanel data={detailsData} onClose={() => setShowDetails(false)} />}
        </TabsContent>

        <TabsContent value="exchange" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Taxa de Câmbio USD/BRL</h3>
              <button
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => handleDownload("exchange")}
              >
                <Download size={16} className="mr-1" />
                Baixar dados
              </button>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {renderDataView(exchangeData, dataView, chartType, "date", "rate", "Taxa (BRL)", "#10b981")}
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
              <div className="flex items-start">
                <Info size={16} className="mr-2 mt-0.5 text-blue-600" />
                <p>
                  A taxa de câmbio USD/BRL apresentou estabilidade relativa nos últimos meses, com pequenas oscilações.
                  A média da taxa nos últimos 12 meses foi de R$ 5,20, com um pico de R$ 5,25 em abril. O volume médio
                  diário de negociações foi de aproximadamente US$ 4 bilhões.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="electricity" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Custo de Energia (BRL/kWh)</h3>
              <button
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => handleDownload("electricity")}
              >
                <Download size={16} className="mr-1" />
                Baixar dados
              </button>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {renderDataView(electricityData, dataView, chartType, "date", "cost", "Custo (BRL/kWh)", "#f59e0b")}
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
              <div className="flex items-start">
                <Info size={16} className="mr-2 mt-0.5 text-blue-600" />
                <p>
                  Os custos de energia industrial no Brasil apresentaram tendência de alta constante, com um aumento
                  acumulado de 9.8% nos últimos 12 meses. O custo médio foi de R$ 0,75/kWh, com um aumento mais
                  acentuado nos últimos 4 meses. A demanda industrial também apresentou crescimento, especialmente no
                  último trimestre.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="imports" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Importação de Alumínio por País (Toneladas)</h3>
              <button
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => handleDownload("imports")}
              >
                <Download size={16} className="mr-1" />
                Baixar dados
              </button>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {dataView === "chart" ? (
                  <PieChart>
                    <Pie
                      data={importData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="country"
                      label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {importData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `${value} ton`} />
                    <Legend />
                  </PieChart>
                ) : (
                  renderDataView(importData, dataView, "bar", "country", "value", "Volume (ton)", "#8b5cf6")
                )}
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Importação por Categoria de Produto</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={importCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Volume (ton)" />
                    <Bar dataKey="price" fill="#82ca9d" name="Preço (USD/ton)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
              <div className="flex items-start">
                <Info size={16} className="mr-2 mt-0.5 text-blue-600" />
                <p>
                  A China continua sendo o principal fornecedor de alumínio para o Brasil, representando 38.5% do total
                  de importações. O alumínio primário é a categoria mais importada, com 18.200 toneladas no último
                  período. O preço médio das importações foi de $2.485/ton, com um aumento de 0.8% em relação ao mês
                  anterior.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
