"use client"

import { useMemo } from "react"

interface TrendData {
  date: string
  score: number
  level: string
}

interface TrendChartProps {
  data: TrendData[]
  maxScore: number
  color: string
  title?: string
}

export default function TrendChart({ data, maxScore, color, title }: TrendChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null

    const width = 320
    const height = 160
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // 计算坐标点
    const points = data.map((item, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth
      const y = padding.top + chartHeight - (item.score / maxScore) * chartHeight
      return { x, y, ...item }
    })

    // 创建路径字符串
    const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

    // 创建填充区域路径
    const areaData = `M ${points[0].x} ${padding.top + chartHeight} L ${pathData.substring(2)} L ${
      points[points.length - 1].x
    } ${padding.top + chartHeight} Z`

    return {
      width,
      height,
      padding,
      chartWidth,
      chartHeight,
      points,
      pathData,
      areaData,
    }
  }, [data, maxScore])

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case "amber":
        return {
          stroke: "#F59E0B",
          fill: "#FEF3C7",
          dot: "#F59E0B",
        }
      case "orange":
        return {
          stroke: "#EA580C",
          fill: "#FED7AA",
          dot: "#EA580C",
        }
      case "yellow":
        return {
          stroke: "#CA8A04",
          fill: "#FEF08A",
          dot: "#CA8A04",
        }
      case "green":
        return {
          stroke: "#059669",
          fill: "#A7F3D0",
          dot: "#059669",
        }
      default:
        return {
          stroke: "#6B7280",
          fill: "#F3F4F6",
          dot: "#6B7280",
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
            <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect
            width={chartData.chartWidth}
            height={chartData.chartHeight}
            x={chartData.padding.left}
            y={chartData.padding.top}
            fill="url(#grid)"
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

          {/* X轴刻度线和标签 */}
          {chartData.points.map((point, index) => {
            const date = new Date(point.date)
            const label = `${date.getMonth() + 1}/${date.getDate()}`
            return (
              <g key={index}>
                <line
                  x1={point.x}
                  y1={chartData.padding.top}
                  x2={point.x}
                  y2={chartData.padding.top + chartData.chartHeight}
                  stroke="#E5E7EB"
                  strokeWidth="0.5"
                />
                <text
                  x={point.x}
                  y={chartData.padding.top + chartData.chartHeight + 16}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {label}
                </text>
              </g>
            )
          })}

          {/* 填充区域 */}
          <path d={chartData.areaData} fill={colors.fill} fillOpacity="0.3" />

          {/* 折线 */}
          <path d={chartData.pathData} fill="none" stroke={colors.stroke} strokeWidth="2" />

          {/* 数据点 */}
          {chartData.points.map((point, index) => (
            <g key={index}>
              <circle cx={point.x} cy={point.y} r="4" fill={colors.dot} stroke="white" strokeWidth="2" />
              {/* 悬浮显示分数 */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="hover:fill-black hover:fill-opacity-10"
              >
                <title>{`${point.date}: ${point.score}分 (${point.level})`}</title>
              </circle>
            </g>
          ))}

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
            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: colors.stroke }}></div>
            <span>测评分数趋势</span>
          </div>
        </div>
      </div>
    </div>
  )
}
