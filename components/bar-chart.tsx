"use client"

import { useMemo } from "react"

interface BarData {
  date: string
  score: number
  level: string
}

interface BarChartProps {
  data: BarData[]
  maxScore: number
  color: string
  title?: string
}

export default function BarChart({ data, maxScore, color, title }: BarChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null

    const width = 320
    const height = 160
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    const barWidth = (chartWidth / data.length) * 0.6
    const barSpacing = chartWidth / data.length

    // 计算柱状图数据
    const bars = data.map((item, index) => {
      const x = padding.left + index * barSpacing + (barSpacing - barWidth) / 2
      const barHeight = (item.score / maxScore) * chartHeight
      const y = padding.top + chartHeight - barHeight
      return { x, y, width: barWidth, height: barHeight, ...item }
    })

    return {
      width,
      height,
      padding,
      chartWidth,
      chartHeight,
      bars,
      barSpacing,
    }
  }, [data, maxScore])

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case "amber":
        return {
          fill: "#F59E0B",
          stroke: "#D97706",
        }
      case "orange":
        return {
          fill: "#EA580C",
          stroke: "#C2410C",
        }
      case "yellow":
        return {
          fill: "#CA8A04",
          stroke: "#A16207",
        }
      case "green":
        return {
          fill: "#059669",
          stroke: "#047857",
        }
      default:
        return {
          fill: "#6B7280",
          stroke: "#4B5563",
        }
    }
  }

  if (!chartData) return null

  const colors = getColorClass(color)

  return (
    <div className="w-full">
      {title && <h4 className="text-sm font-medium mb-3 text-center">{title}</h4>}
      <div className="relative">
        <svg
          width={chartData.width}
          height={chartData.height}
          className="mx-auto"
          style={{ maxWidth: "100%", height: "auto" }}
        >
          {/* 网格线 */}
          <defs>
            <pattern id="grid-bar" width="40" height="32" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect
            width={chartData.chartWidth}
            height={chartData.chartHeight}
            x={chartData.padding.left}
            y={chartData.padding.top}
            fill="url(#grid-bar)"
          />

          {/* Y轴刻度线和标签 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartData.padding.top + chartData.chartHeight * (1 - ratio)
            const score = Math.round(maxScore * ratio)
            return (
              <g key={ratio}>
                <line
                  x1={chartData.padding.left}
                  y1={y}
                  x2={chartData.padding.left + chartData.chartWidth}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <text x={chartData.padding.left - 8} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                  {score}
                </text>
              </g>
            )
          })}

          {/* 柱状图 */}
          {chartData.bars.map((bar, index) => {
            const date = new Date(bar.date)
            const label = `${date.getMonth() + 1}/${date.getDate()}`
            return (
              <g key={index}>
                {/* 柱子 */}
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="1"
                  rx="2"
                  className="hover:opacity-80 transition-opacity"
                >
                  <title>{`${bar.date}: ${bar.score}分 (${bar.level})`}</title>
                </rect>

                {/* 分数标签 */}
                <text
                  x={bar.x + bar.width / 2}
                  y={bar.y - 4}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {bar.score}
                </text>

                {/* X轴标签 */}
                <text
                  x={bar.x + bar.width / 2}
                  y={chartData.padding.top + chartData.chartHeight + 16}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {label}
                </text>
              </g>
            )
          })}

          {/* 坐标轴 */}
          <line
            x1={chartData.padding.left}
            y1={chartData.padding.top + chartData.chartHeight}
            x2={chartData.padding.left + chartData.chartWidth}
            y2={chartData.padding.top + chartData.chartHeight}
            stroke="#374151"
            strokeWidth="1"
          />
          <line
            x1={chartData.padding.left}
            y1={chartData.padding.top}
            x2={chartData.padding.left}
            y2={chartData.padding.top + chartData.chartHeight}
            stroke="#374151"
            strokeWidth="1"
          />
        </svg>

        {/* 图例 */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center text-xs text-gray-600">
            <div className={`w-3 h-3 rounded mr-2`} style={{ backgroundColor: colors.fill }}></div>
            <span>测评分数</span>
          </div>
        </div>
      </div>
    </div>
  )
}
