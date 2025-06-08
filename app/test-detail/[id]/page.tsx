"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, BarChart, TrendingUp, Download, BarChart3 } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import TrendChart from "@/components/trend-chart"
import BarChartComponent from "@/components/bar-chart"

// 定义组件props类型
interface ChartProps {
  data: HistoryItem[];
  maxScore: number;
  color: string;
  title: string;
}

// 定义测评详情的接口
interface TestAnswer {
  question: string;
  answer: string;
  score: number;
}

interface HistoryItem {
  date: string;
  score: number;
  level: string;
}

interface TestDetail {
  id: number;
  testId: number;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  level: string;
  change: string;
  color: string;
  previousScore: number;
  description: string;
  suggestions: string;
  history: HistoryItem[];
  answers: TestAnswer[];
}

// 定义测评历史详情数据的类型
type MockTestDetails = {
  [key: number]: TestDetail;
}

// 模拟测评历史详情数据
const mockTestDetails: MockTestDetails = {
  1: {
    id: 1,
    testId: 1,
    title: "青少年抑郁自评量表",
    date: "2023-06-15",
    score: 6,
    maxScore: 15,
    level: "轻度抑郁",
    change: "改善",
    color: "amber",
    previousScore: 9,
    description: "你可能有轻微的抑郁症状，但不太严重。",
    suggestions: "尝试增加体育锻炼，保持规律的作息，与朋友交流感受。",
    history: [
      { date: "2023-01-10", score: 12, level: "中度抑郁" },
      { date: "2023-02-15", score: 11, level: "中度抑郁" },
      { date: "2023-03-22", score: 9, level: "轻度抑郁" },
      { date: "2023-04-18", score: 8, level: "轻度抑郁" },
      { date: "2023-05-20", score: 7, level: "轻度抑郁" },
      { date: "2023-06-15", score: 6, level: "轻度抑郁" },
    ],
    answers: [
      { question: "在过去的两周里，我感到情绪低落、沮丧或绝望", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我对做事情几乎没有兴趣或乐趣", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我入睡困难、睡不安稳或睡眠过多", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我感到疲倦或没有活力", answer: "一半以上的天数", score: 2 },
      { question: "在过去的两周里，我食欲不振或过度饮食", answer: "完全没有", score: 0 },
    ],
  },
  2: {
    id: 2,
    testId: 3,
    title: "学业压力评估量表",
    date: "2023-05-20",
    score: 12,
    maxScore: 15,
    level: "较大压力",
    change: "持平",
    color: "yellow",
    previousScore: 12,
    description: "你的学业压力较大，可能影响到情绪和生活。",
    suggestions: "与老师或家长沟通你的感受，学习减压技巧，必要时调整学习计划。",
    history: [
      { date: "2023-01-05", score: 8, level: "中等压力" },
      { date: "2023-02-05", score: 10, level: "较大压力" },
      { date: "2023-03-10", score: 11, level: "较大压力" },
      { date: "2023-04-01", score: 12, level: "较大压力" },
      { date: "2023-04-25", score: 13, level: "较大压力" },
      { date: "2023-05-20", score: 12, level: "较大压力" },
    ],
    answers: [
      { question: "我经常因为学习任务繁重而感到压力", answer: "完全符合", score: 3 },
      { question: "我担心自己的学习成绩不够好", answer: "完全符合", score: 3 },
      { question: "我因为考试而感到焦虑", answer: "比较符合", score: 2 },
      { question: "我感到父母/老师对我的学习期望过高", answer: "比较符合", score: 2 },
      { question: "我因为学习压力而影响睡眠或饮食", answer: "有点符合", score: 1 },
    ],
  },
  3: {
    id: 3,
    testId: 2,
    title: "青少年焦虑自评量表",
    date: "2023-04-10",
    score: 5,
    maxScore: 15,
    level: "轻度焦虑",
    change: "改善",
    color: "orange",
    previousScore: 8,
    description: "你可能有轻微的焦虑症状，但不太严重。",
    suggestions: "尝试深呼吸和冥想练习，保持规律的作息，减少咖啡因摄入。",
    history: [
      { date: "2023-01-15", score: 11, level: "中度焦虑" },
      { date: "2023-02-10", score: 10, level: "中度焦虑" },
      { date: "2023-02-28", score: 8, level: "轻度焦虑" },
      { date: "2023-03-15", score: 7, level: "轻度焦虑" },
      { date: "2023-03-30", score: 6, level: "轻度焦虑" },
      { date: "2023-04-10", score: 5, level: "轻度焦虑" },
    ],
    answers: [
      { question: "在过去的两周里，我感到紧张、焦虑或心烦意乱", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我无法停止或控制担忧", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我对各种各样的事情过度担忧", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我很难放松下来", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我坐立不安，难以保持平静", answer: "有几天", score: 1 },
    ],
  },
  4: {
    id: 4,
    testId: 4,
    title: "人际关系自评量表",
    date: "2023-03-25",
    score: 11,
    maxScore: 15,
    level: "社交良好",
    change: "改善",
    color: "amber",
    previousScore: 8,
    description: "你具备基本的社交能力，能够维持稳定的人际关系。",
    suggestions: "继续发展深层次的人际关系，学习冲突解决技巧，拓展社交圈。",
    history: [
      { date: "2022-12-10", score: 6, level: "社交欠佳" },
      { date: "2023-01-20", score: 8, level: "社交欠佳" },
      { date: "2023-02-15", score: 9, level: "社交欠佳" },
      { date: "2023-03-05", score: 10, level: "社交良好" },
      { date: "2023-03-25", score: 11, level: "社交良好" },
    ],
    answers: [
      { question: "我能够轻松地与他人建立关系", answer: "比较符合", score: 2 },
      { question: "我在社交场合感到自在", answer: "比较符合", score: 2 },
      { question: "我能够理解他人的感受和想法", answer: "完全符合", score: 3 },
      { question: "我有一群可以信任的朋友", answer: "比较符合", score: 2 },
      { question: "当我有问题时，我能够向他人寻求帮助", answer: "比较符合", score: 2 },
    ],
  },
  5: {
    id: 5,
    testId: 1,
    title: "青少年抑郁自评量表",
    date: "2023-02-28",
    score: 3,
    maxScore: 15,
    level: "无抑郁",
    change: "改善",
    color: "amber",
    previousScore: 7,
    description: "你目前的情绪状态良好，没有明显的抑郁症状。",
    suggestions: "继续保持积极的生活态度，定期进行自我情绪检查。",
    history: [
      { date: "2022-11-15", score: 9, level: "轻度抑郁" },
      { date: "2022-12-20", score: 7, level: "轻度抑郁" },
      { date: "2023-01-25", score: 5, level: "轻度抑郁" },
      { date: "2023-02-10", score: 4, level: "无抑郁" },
      { date: "2023-02-28", score: 3, level: "无抑郁" },
    ],
    answers: [
      { question: "在过去的两周里，我感到情绪低落、沮丧或绝望", answer: "完全没有", score: 0 },
      { question: "在过去的两周里，我对做事情几乎没有兴趣或乐趣", answer: "完全没有", score: 0 },
      { question: "在过去的两周里，我入睡困难、睡不安稳或睡眠过多", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我感到疲倦或没有活力", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我食欲不振或过度饮食", answer: "有几天", score: 1 },
    ],
  },
  6: {
    id: 6,
    testId: 2,
    title: "青少年焦虑自评量表",
    date: "2023-01-18",
    score: 8,
    maxScore: 15,
    level: "轻度焦虑",
    change: "恶化",
    color: "orange",
    previousScore: 6,
    description: "你可能有轻微的焦虑症状，但不太严重。",
    suggestions: "尝试深呼吸和冥想练习，保持规律的作息，减少咖啡因摄入。",
    history: [
      { date: "2022-10-20", score: 4, level: "无焦虑" },
      { date: "2022-11-25", score: 6, level: "轻度焦虑" },
      { date: "2022-12-30", score: 7, level: "轻度焦虑" },
      { date: "2023-01-18", score: 8, level: "轻度焦虑" },
    ],
    answers: [
      { question: "在过去的两周里，我感到紧张、焦虑或心烦意乱", answer: "一半以上的天数", score: 2 },
      { question: "在过去的两周里，我无法停止或控制担忧", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我对各种各样的事情过度担忧", answer: "一半以上的天数", score: 2 },
      { question: "在过去的两周里，我很难放松下来", answer: "有几天", score: 1 },
      { question: "在过去的两周里，我坐立不安，难以保持平静", answer: "一半以上的天数", score: 2 },
    ],
  },
}

export default function TestDetail() {
  const router = useRouter()
  const params = useParams()
  const [testDetail, setTestDetail] = useState<TestDetail | null>(null)
  const [chartType, setChartType] = useState("line") // "line" or "bar"

  useEffect(() => {
    // 在实际应用中，这里应该从API获取数据
    if (params.id) {
      const id = Number.parseInt(params.id.toString())
      setTestDetail(mockTestDetails[id])
    }
  }, [params.id])

  if (!testDetail) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <header className="px-5 py-4 flex items-center bg-white border-b sticky top-0 z-10">
          <button onClick={() => router.back()} className="flex items-center text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-medium ml-4">测评详情</h1>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p>加载中...</p>
        </div>
        <BottomNav />
      </main>
    )
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-500"
      case "orange":
        return "bg-orange-500"
      case "yellow":
        return "bg-yellow-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-5 py-4 flex items-center bg-white border-b sticky top-0 z-10">
        <button onClick={() => router.back()} className="flex items-center text-gray-700">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>返回</span>
        </button>
        <h1 className="text-lg font-medium ml-4">测评详情</h1>
      </header>

      <div className="flex-1 overflow-auto pb-16">
        <div className="p-4">
          <div className={`p-5 rounded-t-xl text-white ${getColorClass(testDetail.color)}`}>
            <h2 className="text-xl font-bold mb-1">{testDetail.title}</h2>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{testDetail.date}</span>
            </div>
          </div>

          <div className="bg-white rounded-b-xl shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-medium">测评结果</div>
              <div className="text-xl font-bold text-amber-600">{testDetail.level}</div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>得分</span>
                <span>
                  {testDetail.score}/{testDetail.maxScore}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getColorClass(testDetail.color)}`}
                  style={{ width: `${(testDetail.score / testDetail.maxScore) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">结果解释</h3>
              <p className="text-sm text-gray-700 mb-3">{testDetail.description}</p>
              <h3 className="font-medium mb-2">建议</h3>
              <p className="text-sm text-gray-700">{testDetail.suggestions}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-amber-500" />
                <h3 className="text-lg font-medium">测评趋势</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChartType("line")}
                  className={`p-2 rounded ${
                    chartType === "line" ? "bg-amber-100 text-amber-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`p-2 rounded ${
                    chartType === "bar" ? "bg-amber-100 text-amber-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {chartType === "line" ? (
              <TrendChart
                data={testDetail.history}
                maxScore={testDetail.maxScore}
                color={testDetail.color}
                title="分数变化趋势"
              />
            ) : (
              <BarChartComponent
                data={testDetail.history}
                maxScore={testDetail.maxScore}
                color={testDetail.color}
                title="分数变化趋势"
              />
            )}

            <div className="text-sm text-gray-500 text-center mt-4">
              {testDetail.history.length > 1 ? (
                <p>
                  与上次相比
                  <span
                    className={
                      testDetail.change === "改善"
                        ? "text-green-500"
                        : testDetail.change === "恶化"
                          ? "text-red-500"
                          : "text-amber-500"
                    }
                  >
                    {testDetail.change}
                  </span>
                  {testDetail.previousScore && ` (${testDetail.score} vs ${testDetail.previousScore})`}
                </p>
              ) : (
                <p>首次测评，暂无趋势数据</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center mb-4">
              <BarChart className="h-5 w-5 mr-2 text-amber-500" />
              <h3 className="text-lg font-medium">测评详情</h3>
            </div>

            <div className="space-y-4">
              {testDetail.answers.map((item: TestAnswer, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium">问题 {index + 1}</div>
                    <div className="text-sm text-gray-500">得分: {item.score}</div>
                  </div>
                  <p className="text-sm mb-2">{item.question}</p>
                  <div className="bg-gray-100 text-sm p-2 rounded">回答: {item.answer}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <Button variant="outline" className="flex items-center" onClick={() => router.push(`/test`)}>
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
