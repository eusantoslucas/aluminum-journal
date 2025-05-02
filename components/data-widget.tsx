"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DollarSign, RefreshCw, TrendingUp, TrendingDown, Zap, Truck, Download } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

type SparklineData = number[]

type TableData = {
  country: string
  price: number
  change: number
}

type DataWidgetProps = {
  title: string
  value: string
  change: number
  sparklineData?: SparklineData
  tableData?: TableData[]
  icon: "dollar" | "currency" | "lightning" | "truck"
  lastUpdated?: string
}

export function DataWidget({ title, value, change, sparklineData, tableData, icon, lastUpdated }: DataWidgetProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; value: number } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // In a real app, this would trigger a data refresh
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleDownload = () => {
    if (!sparklineData && !tableData) return

    let csvContent = "data:text/csv;charset=utf-8,"

    if (sparklineData) {
      csvContent += "Index,Value\n"
      sparklineData.forEach((value, index) => {
        csvContent += `${index},${value}\n`
      })
    } else if (tableData) {
      csvContent += "Country,Price,Change\n"
      tableData.forEach((item) => {
        csvContent += `${item.country},${item.price},${item.change}\n`
      })
    }

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}-data.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderIcon = () => {
    switch (icon) {
      case "dollar":
        return <DollarSign className="text-blue-500" size={20} />
      case "currency":
        return <DollarSign className="text-green-500" size={20} />
      case "lightning":
        return <Zap className="text-yellow-500" size={20} />
      case "truck":
        return <Truck className="text-purple-500" size={20} />
    }
  }

  return (
    <TooltipProvider>
      <div className="data-widget group">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {renderIcon()}
            <h3 className="text-sm font-medium ml-2 text-gray-600">{title}</h3>
          </div>
          <div className="flex items-center space-x-1">
            {lastUpdated && (
              <Tooltip content={`Última atualização: ${lastUpdated}`}>
                <span className="text-xs text-gray-500 mr-2 hidden group-hover:inline-block">{lastUpdated}</span>
              </Tooltip>
            )}
            <button
              onClick={handleDownload}
              className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Baixar dados"
            >
              <Download size={16} />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Atualizar dados"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center text-sm ${change > 0 ? "text-green-600" : "text-red-600"}`}>
            {change > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            {Math.abs(change).toFixed(2)}%
          </div>
        </div>

        {sparklineData && (
          <div className="h-16 mt-2 relative" ref={chartRef}>
            <SparklineChart data={sparklineData} color={change > 0 ? "#10b981" : "#ef4444"} onHover={setHoveredPoint} />
            {hoveredPoint !== null && (
              <div
                className="absolute bg-white px-2 py-1 text-xs rounded shadow-md border border-gray-200 z-10 transform -translate-x-1/2"
                style={{
                  left: `${(hoveredPoint.index / (sparklineData.length - 1)) * 100}%`,
                  bottom: "100%",
                }}
              >
                {hoveredPoint.value.toFixed(2)}
              </div>
            )}
          </div>
        )}

        {tableData && (
          <div className="mt-2 text-xs">
            <div className="grid grid-cols-3 font-medium text-gray-600 mb-1">
              <div>País</div>
              <div>Preço</div>
              <div>Variação</div>
            </div>
            {tableData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 py-1 border-t border-gray-100">
                <div>{item.country}</div>
                <div>${item.price.toFixed(2)}</div>
                <div className={item.change > 0 ? "text-green-600" : "text-red-600"}>
                  {item.change > 0 ? "+" : ""}
                  {item.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

function SparklineChart({
  data,
  color,
  onHover,
}: {
  data: number[]
  color: string
  onHover: (point: { index: number; value: number } | null) => void
}) {
  // Find min and max for scaling
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1 // Avoid division by zero

  // Calculate points for the polyline
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(" ")

  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - svgRect.left
    const width = svgRect.width

    // Calculate the closest data point
    const index = Math.round((x / width) * (data.length - 1))
    if (index >= 0 && index < data.length) {
      onHover({ index, value: data[index] })
    }
  }

  const handleMouseLeave = () => {
    onHover(null)
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-crosshair"
    >
      {/* Add a gradient fill under the line */}
      <defs>
        <linearGradient id={`sparkline-gradient-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={`M0,100 ${points} 100,100 Z`} fill={`url(#sparkline-gradient-${color.replace("#", "")})`} />

      {/* Line */}
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />

      {/* Dots at data points */}
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - ((value - min) / range) * 100
        return <circle key={index} cx={x} cy={y} r="1.5" fill={color} />
      })}
    </svg>
  )
}
