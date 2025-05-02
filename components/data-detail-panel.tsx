"use client"

import { X, Download, Info } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type DataDetailPanelProps = {
  data: any
  onClose: () => void
}

export function DataDetailPanel({ data, onClose }: DataDetailPanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-2xl h-full overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-lg font-bold">Detalhes do Dado</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Fechar">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-md font-medium mb-3">Informações Gerais</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Data</p>
                <p className="font-medium">{data.date}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-medium">{data.price || data.rate || data.cost || data.value}</p>
              </div>
              {data.volume && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Volume</p>
                  <p className="font-medium">{data.volume}</p>
                </div>
              )}
              {data.open && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Abertura</p>
                  <p className="font-medium">{data.open}</p>
                </div>
              )}
              {data.high && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Máxima</p>
                  <p className="font-medium">{data.high}</p>
                </div>
              )}
              {data.low && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Mínima</p>
                  <p className="font-medium">{data.low}</p>
                </div>
              )}
              {data.close && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Fechamento</p>
                  <p className="font-medium">{data.close}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-3">Histórico Recente</h4>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={Array(7)
                    .fill(0)
                    .map((_, i) => ({
                      day: `Dia ${i + 1}`,
                      value: data.price
                        ? data.price * (0.98 + Math.random() * 0.04)
                        : data.rate
                          ? data.rate * (0.98 + Math.random() * 0.04)
                          : data.cost
                            ? data.cost * (0.98 + Math.random() * 0.04)
                            : data.value * (0.98 + Math.random() * 0.04),
                    }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} name="Valor" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-3">Análise de Mercado</h4>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
              <div className="flex items-start">
                <Info size={16} className="mr-2 mt-0.5 text-blue-600" />
                <div>
                  <p className="mb-2">
                    {data.price
                      ? `O preço do alumínio apresentou ${data.price > 2400 ? "alta" : "queda"} em relação à média histórica.`
                      : data.rate
                        ? `A taxa de câmbio USD/BRL está ${data.rate > 5.2 ? "acima" : "abaixo"} da média dos últimos 30 dias.`
                        : data.cost
                          ? `O custo de energia está em tendência de ${data.cost > 0.75 ? "alta" : "estabilidade"} nos últimos períodos.`
                          : `O volume de importação de ${data.country || "alumínio"} representa uma parcela significativa do mercado.`}
                  </p>
                  <p>
                    Fatores que podem influenciar este indicador nos próximos períodos incluem políticas comerciais,
                    variações cambiais e demanda do setor de construção civil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <Download size={16} className="mr-1" />
              Exportar Relatório Detalhado
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
