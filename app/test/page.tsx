"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Clock, BarChart, History, ArrowLeft, Filter, TrendingUp, BarChart3 } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import TrendChart from "@/components/trend-chart"
import BarChartComponent from "@/components/bar-chart"
import { useRouter } from "next/navigation"
import Image from "next/image"

// 定义类型
interface Option {
  value: string
  label: string
}

interface Question {
  id: number
  text: string
  options: Option[]
}

interface ResultLevel {
  min: number
  max: number
  level: string
  description: string
  suggestions: string
}

interface TestData {
  id: number
  title: string
  description: string
  questions: Question[]
  totalQuestions: number
  time: string
  category: string
  color: string
  results: ResultLevel[]
}

interface TestHistoryAnswer {
  question: string
  answer: string
  score: number
}

interface HistoryPoint {
  date: string
  score: number
  level: string
}

interface TestHistoryItem {
  id: number
  testId: number
  title: string
  date: string
  score: number
  level: string
  change: string
  color: string
  previousScore?: number
  answers: TestHistoryAnswer[]
  description: string
  suggestions: string
  history: HistoryPoint[]
}

interface TestResult {
  testId: number
  title: string
  score: number
  maxScore: number
  level: string
  description: string
  suggestions: string
  date: string
}

// 测评量表数据
const assessmentData: Record<number, TestData> = {
  1: {
    id: 1,
    title: "青少年抑郁自评量表",
    description: "评估青少年抑郁症状的严重程度，帮助识别可能的抑郁倾向。",
    questions: [
      {
        id: 1,
        text: "在过去的两周里，我感到情绪低落、沮丧或绝望",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 2,
        text: "在过去的两周里，我对做事情几乎没有兴趣或乐趣",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 3,
        text: "在过去的两周里，我入睡困难、睡不安稳或睡眠过多",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 4,
        text: "在过去的两周里，我感到疲倦或没有活力",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 5,
        text: "在过去的两周里，我食欲不振或过度饮食",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
    ],
    totalQuestions: 5,
    time: "约5分钟",
    category: "情绪健康",
    color: "pink",
    results: [
      {
        min: 0,
        max: 4,
        level: "无抑郁",
        description: "你目前的情绪状态良好，没有明显的抑郁症状。",
        suggestions: "继续保持积极的生活态度，定期进行自我情绪检查。",
      },
      {
        min: 5,
        max: 9,
        level: "轻度抑郁",
        description: "你可能有轻微的抑郁症状，但不太严重。",
        suggestions: "尝试增加体育锻炼，保持规律的作息，与朋友交流感受。",
      },
      {
        min: 10,
        max: 14,
        level: "中度抑郁",
        description: "你的抑郁症状达到中等程度，可能影响日常生活。",
        suggestions: "建议寻求专业心理咨询，学习情绪管理技巧，告知家人或朋友你的感受。",
      },
      {
        min: 15,
        max: 20,
        level: "重度抑郁",
        description: "你的抑郁症状较为严重，需要引起重视。",
        suggestions: "强烈建议尽快咨询专业心理医生或精神科医生，不要独自面对。",
      },
    ],
  },
  2: {
    id: 2,
    title: "青少年焦虑自评量表",
    description: "评估青少年焦虑症状的严重程度，帮助识别可能的焦虑倾向。",
    questions: [
      {
        id: 1,
        text: "在过去的两周里，我感到紧张、焦虑或心烦意乱",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 2,
        text: "在过去的两周里，我无法停止或控制担忧",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 3,
        text: "在过去的两周里，我对各种各样的事情过度担忧",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 4,
        text: "在过去的两周里，我很难放松下来",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
      {
        id: 5,
        text: "在过去的两周里，我坐立不安，难以保持平静",
        options: [
          { value: "0", label: "完全没有" },
          { value: "1", label: "有几天" },
          { value: "2", label: "一半以上的天数" },
          { value: "3", label: "几乎每天" },
        ],
      },
    ],
    totalQuestions: 5,
    time: "约5分钟",
    category: "情绪健康",
    color: "pink",
    results: [
      {
        min: 0,
        max: 4,
        level: "无焦虑",
        description: "你目前的情绪状态良好，没有明显的焦虑症状。",
        suggestions: "继续保持积极的生活态度，学习简单的放松技巧。",
      },
      {
        min: 5,
        max: 9,
        level: "轻度焦虑",
        description: "你可能有轻微的焦虑症状，但不太严重。",
        suggestions: "尝试深呼吸和冥想练习，保持规律的作息，减少咖啡因摄入。",
      },
      {
        min: 10,
        max: 14,
        level: "中度焦虑",
        description: "你的焦虑症状达到中等程度，可能影响日常生活。",
        suggestions: "建议寻求专业心理咨询，学习焦虑管理技巧，告知家人或朋友你的感受。",
      },
      {
        min: 15,
        max: 20,
        level: "重度焦虑",
        description: "你的焦虑症状较为严重，需要引起重视。",
        suggestions: "强烈建议尽快咨询专业心理医生或精神科医生，不要独自面对。",
      },
    ],
  },
  3: {
    id: 3,
    title: "学业压力评估量表",
    description: "评估学业压力水平及其对心理健康的影响，帮助制定应对策略。",
    questions: [
      {
        id: 1,
        text: "我经常因为学习任务繁重而感到压力",
        options: [
          { value: "0", label: "完全不符合" },
          { value: "1", label: "有点符合" },
          { value: "2", label: "比较符合" },
          { value: "3", label: "完全符合" },
        ],
      },
      {
        id: 2,
        text: "我担心自己的学习成绩不够好",
        options: [
          { value: "0", label: "完全不符合" },
          { value: "1", label: "有点符合" },
          { value: "2", label: "比较符合" },
          { value: "3", label: "完全符合" },
        ],
      },
      {
        id: 3,
        text: "我因为考试而感到焦虑",
        options: [
          { value: "0", label: "完全不符合" },
          { value: "1", label: "有点符合" },
          { value: "2", label: "比较符合" },
          { value: "3", label: "完全符合" },
        ],
      },
      {
        id: 4,
        text: "我感到父母/老师对我的学习期望过高",
        options: [
          { value: "0", label: "完全不符合" },
          { value: "1", label: "有点符合" },
          { value: "2", label: "比较符合" },
          { value: "3", label: "完全符合" },
        ],
      },
      {
        id: 5,
        text: "我因为学习压力而影响睡眠或饮食",
        options: [
          { value: "0", label: "完全不符合" },
          { value: "1", label: "有点符合" },
          { value: "2", label: "比较符合" },
          { value: "3", label: "完全符合" },
        ],
      },
    ],
    totalQuestions: 5,
    time: "约5分钟",
    category: "学业压力",
    color: "pink",
    results: [
      {
        min: 0,
        max: 4,
        level: "轻微压力",
        description: "你的学业压力水平较低，能够良好地应对学习任务。",
        suggestions: "继续保持良好的学习习惯，适当设定学习目标。",
      },
      {
        min: 5,
        max: 9,
        level: "中等压力",
        description: "你感受到一定的学业压力，但基本可以应对。",
        suggestions: "学习时间管理技巧，设定合理的学习计划，保证充足的休息时间。",
      },
      {
        min: 10,
        max: 14,
        level: "较大压力",
        description: "你的学业压力较大，可能影响到情绪和生活。",
        suggestions: "与老师或家长沟通你的感受，学习减压技巧，必要时调整学习计划。",
      },
      {
        min: 15,
        max: 20,
        level: "严重压力",
        description: "你的学业压力水平很高，已经影响到身心健康。",
        suggestions: "建议寻求心理咨询师帮助，重新评估学习目标，学习应对压力的方法。",
      },
    ],
  },
  4: {
    id: 4,
    title: "人际关系自评量表",
    description: "评估社交能力和人际关系状况，帮助识别社交困难和改进方向。",
    questions: [
      {
        id: 1,
        text: "我能够轻松地与他人建立关系",
        options: [
          { value: "3", label: "完全符合" },
          { value: "2", label: "比较符合" },
          { value: "1", label: "有点符合" },
          { value: "0", label: "完全不符合" },
        ],
      },
      {
        id: 2,
        text: "我在社交场合感到自在",
        options: [
          { value: "3", label: "完全符合" },
          { value: "2", label: "比较符合" },
          { value: "1", label: "有点符合" },
          { value: "0", label: "完全不符合" },
        ],
      },
      {
        id: 3,
        text: "我能够理解他人的感受和想法",
        options: [
          { value: "3", label: "完全符合" },
          { value: "2", label: "比较符合" },
          { value: "1", label: "有点符合" },
          { value: "0", label: "完全不符合" },
        ],
      },
      {
        id: 4,
        text: "我有一群可以信任的朋友",
        options: [
          { value: "3", label: "完全符合" },
          { value: "2", label: "比较符合" },
          { value: "1", label: "有点符合" },
          { value: "0", label: "完全不符合" },
        ],
      },
      {
        id: 5,
        text: "当我有问题时，我能够向他人寻求帮助",
        options: [
          { value: "3", label: "完全符合" },
          { value: "2", label: "比较符合" },
          { value: "1", label: "有点符合" },
          { value: "0", label: "完全不符合" },
        ],
      },
    ],
    totalQuestions: 5,
    time: "约5分钟",
    category: "人际关系",
    color: "pink",
    results: [
      {
        min: 0,
        max: 4,
        level: "社交困难",
        description: "你在人际交往方面可能面临较大挑战，社交能力有待提高。",
        suggestions: "从小范围社交开始，参加兴趣小组，学习基本的社交技巧。",
      },
      {
        min: 5,
        max: 9,
        level: "社交欠佳",
        description: "你的社交能力有一定局限性，在某些社交场合可能感到不适。",
        suggestions: "练习倾听和表达技巧，尝试参与更多社交活动，逐步建立自信。",
      },
      {
        min: 10,
        max: 14,
        level: "社交良好",
        description: "你具备基本的社交能力，能够维持稳定的人际关系。",
        suggestions: "继续发展深层次的人际关系，学习冲突解决技巧，拓展社交圈。",
      },
      {
        min: 15,
        max: 20,
        level: "社交优秀",
        description: "你的社交能力很强，能够轻松建立和维持良好的人际关系。",
        suggestions: "可以尝试帮助他人提高社交能力，发展领导才能，维护现有的人际网络。",
      },
    ],
  },
}

export default function Test() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("available")
  const [activeTest, setActiveTest] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [progress, setProgress] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>([])
  const [filterCategory, setFilterCategory] = useState("all")
  const [showTestDetail, setShowTestDetail] = useState(false)
  const [selectedTestDetail, setSelectedTestDetail] = useState<TestHistoryItem | null>(null)
  const [chartType, setChartType] = useState("line") // "line" or "bar"

  // 模拟从本地存储加载历史测评数据
  useEffect(() => {
    // 这里应该是从本地存储或API获取数据
    // 这里使用模拟数据
    const mockHistory: TestHistoryItem[] = [
      {
        id: 1,
        testId: 1,
        title: "青少年抑郁自评量表",
        date: "2023-06-15",
        score: 6,
        level: "轻度抑郁",
        change: "改善",
        color: "pink",
        previousScore: 9,
        answers: [
          { question: "在过去的两周里，我感到情绪低落、沮丧或绝望", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我对做事情几乎没有兴趣或乐趣", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我入睡困难、睡不安稳或睡眠过多", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我感到疲倦或没有活力", answer: "一半以上的天数", score: 2 },
          { question: "在过去的两周里，我食欲不振或过度饮食", answer: "完全没有", score: 0 },
        ],
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
      },
      {
        id: 2,
        testId: 3,
        title: "学业压力评估量表",
        date: "2023-05-20",
        score: 12,
        level: "较大压力",
        change: "持平",
        color: "pink",
        previousScore: 12,
        answers: [
          { question: "我经常因为学习任务繁重而感到压力", answer: "完全符合", score: 3 },
          { question: "我担心自己的学习成绩不够好", answer: "完全符合", score: 3 },
          { question: "我因为考试而感到焦虑", answer: "比较符合", score: 2 },
          { question: "我感到父母/老师对我的学习期望过高", answer: "比较符合", score: 2 },
          { question: "我因为学习压力而影响睡眠或饮食", answer: "有点符合", score: 1 },
        ],
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
      },
      {
        id: 3,
        testId: 2,
        title: "青少年焦虑自评量表",
        date: "2023-04-10",
        score: 5,
        level: "轻度焦虑",
        change: "改善",
        color: "pink",
        previousScore: 8,
        answers: [
          { question: "在过去的两周里，我感到紧张、焦虑或心烦意乱", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我无法停止或控制担忧", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我对各种各样的事情过度担忧", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我很难放松下来", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我坐立不安，难以保持平静", answer: "有几天", score: 1 },
        ],
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
      },
      {
        id: 4,
        testId: 4,
        title: "人际关系自评量表",
        date: "2023-03-25",
        score: 11,
        level: "社交良好",
        change: "改善",
        color: "pink",
        previousScore: 8,
        answers: [
          { question: "我能够轻松地与他人建立关系", answer: "比较符合", score: 2 },
          { question: "我在社交场合感到自在", answer: "比较符合", score: 2 },
          { question: "我能够理解他人的感受和想法", answer: "完全符合", score: 3 },
          { question: "我有一群可以信任的朋友", answer: "比较符合", score: 2 },
          { question: "当我有问题时，我能够向他人寻求帮助", answer: "比较符合", score: 2 },
        ],
        description: "你具备基本的社交能力，能够维持稳定的人际关系。",
        suggestions: "继续发展深层次的人际关系，学习冲突解决技巧，拓展社交圈。",
        history: [
          { date: "2022-12-10", score: 6, level: "社交欠佳" },
          { date: "2023-01-20", score: 8, level: "社交欠佳" },
          { date: "2023-02-15", score: 9, level: "社交欠佳" },
          { date: "2023-03-05", score: 10, level: "社交良好" },
          { date: "2023-03-25", score: 11, level: "社交良好" },
        ],
      },
      {
        id: 5,
        testId: 1,
        title: "青少年抑郁自评量表",
        date: "2023-02-28",
        score: 3,
        level: "无抑郁",
        change: "改善",
        color: "pink",
        previousScore: 7,
        answers: [
          { question: "在过去的两周里，我感到情绪低落、沮丧或绝望", answer: "完全没有", score: 0 },
          { question: "在过去的两周里，我对做事情几乎没有兴趣或乐趣", answer: "完全没有", score: 0 },
          { question: "在过去的两周里，我入睡困难、睡不安稳或睡眠过多", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我感到疲倦或没有活力", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我食欲不振或过度饮食", answer: "有几天", score: 1 },
        ],
        description: "你目前的情绪状态良好，没有明显的抑郁症状。",
        suggestions: "继续保持积极的生活态度，定期进行自我情绪检查。",
        history: [
          { date: "2022-11-15", score: 9, level: "轻度抑郁" },
          { date: "2022-12-20", score: 7, level: "轻度抑郁" },
          { date: "2023-01-25", score: 5, level: "轻度抑郁" },
          { date: "2023-02-10", score: 4, level: "无抑郁" },
          { date: "2023-02-28", score: 3, level: "无抑郁" },
        ],
      },
      {
        id: 6,
        testId: 2,
        title: "青少年焦虑自评量表",
        date: "2023-01-18",
        score: 8,
        level: "轻度焦虑",
        change: "恶化",
        color: "pink",
        previousScore: 6,
        answers: [
          { question: "在过去的两周里，我感到紧张、焦虑或心烦意乱", answer: "一半以上的天数", score: 2 },
          { question: "在过去的两周里，我无法停止或控制担忧", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我对各种各样的事情过度担忧", answer: "一半以上的天数", score: 2 },
          { question: "在过去的两周里，我很难放松下来", answer: "有几天", score: 1 },
          { question: "在过去的两周里，我坐立不安，难以保持平静", answer: "一半以上的天数", score: 2 },
        ],
        description: "你可能有轻微的焦虑症状，但不太严重。",
        suggestions: "尝试深呼吸和冥想练习，保持规律的作息，减少咖啡因摄入。",
        history: [
          { date: "2022-10-20", score: 4, level: "无焦虑" },
          { date: "2022-11-25", score: 6, level: "轻度焦虑" },
          { date: "2022-12-30", score: 7, level: "轻度焦虑" },
          { date: "2023-01-18", score: 8, level: "轻度焦虑" },
        ],
      },
    ]
    setTestHistory(mockHistory)
  }, [])

  const startTest = (testId: number) => {
    setActiveTest(testId)
    setCurrentQuestion(1)
    setProgress(calculateProgress(1, assessmentData[testId].totalQuestions))
    setAnswers({})
    setShowResult(false)
    setTestResult(null)
    setShowTestDetail(false)
  }

  const calculateProgress = (current: number, total: number) => {
    return (current / total) * 100
  }

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: Number.parseInt(value),
    })
  }

  const nextQuestion = () => {
    if (activeTest === null) return
    
    const currentTestData = assessmentData[activeTest]
    if (currentQuestion < currentTestData.totalQuestions) {
      const nextQ = currentQuestion + 1
      setCurrentQuestion(nextQ)
      setProgress(calculateProgress(nextQ, currentTestData.totalQuestions))
    } else {
      // 计算结果
      calculateResult()
    }
  }

  const calculateResult = () => {
    if (activeTest === null) return
    
    const currentTestData = assessmentData[activeTest]
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)

    // 根据分数确定结果级别
    const resultLevel = currentTestData.results.find((result: ResultLevel) => totalScore >= result.min && totalScore <= result.max)
    
    if (!resultLevel) return

    setTestResult({
      testId: activeTest,
      title: currentTestData.title,
      score: totalScore,
      maxScore: currentTestData.totalQuestions * 3,
      level: resultLevel.level,
      description: resultLevel.description,
      suggestions: resultLevel.suggestions,
      date: new Date().toISOString().split("T")[0],
    })

    setShowResult(true)

    // 保存到历史记录
    const newHistory: TestHistoryItem = {
      id: testHistory.length + 1,
      testId: activeTest,
      title: currentTestData.title,
      date: new Date().toISOString().split("T")[0],
      score: totalScore,
      level: resultLevel.level,
      change: "首次",
      color: currentTestData.color,
      answers: currentTestData.questions.map((q: Question, index: number) => ({
        question: q.text,
        answer: q.options.find((opt) => opt.value === answers[index + 1]?.toString())?.label || "",
        score: answers[index + 1] || 0,
      })),
      description: resultLevel.description,
      suggestions: resultLevel.suggestions,
      history: []
    }

    // 检查是否有之前的测试记录来确定变化
    const previousTest = testHistory.find((h) => h.testId === activeTest)
    if (previousTest) {
      if (totalScore < previousTest.score) {
        newHistory.change = "改善"
        newHistory.previousScore = previousTest.score
      } else if (totalScore > previousTest.score) {
        newHistory.change = "恶化"
        newHistory.previousScore = previousTest.score
      } else {
        newHistory.change = "持平"
        newHistory.previousScore = previousTest.score
      }

      // 添加历史记录
      newHistory.history = [
        ...previousTest.history.filter((h) => h.date !== newHistory.date),
        { date: newHistory.date, score: totalScore, level: resultLevel.level },
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else {
      newHistory.history = [{ date: newHistory.date, score: totalScore, level: resultLevel.level }]
    }

    setTestHistory([newHistory, ...testHistory.filter((h) => h.testId !== activeTest)])
  }

  const finishTest = () => {
    setActiveTest(null)
    setCurrentQuestion(1)
    setProgress(0)
    setShowResult(false)
    setTestResult(null)
    setActiveTab("history")
    setShowTestDetail(false)
  }

  const viewTestDetail = (test: TestHistoryItem) => {
    setSelectedTestDetail(test)
    setShowTestDetail(true)
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "pink":
        return "bg-[#fff8f8] text-[#f39b98]"
      case "orange":
        return "bg-orange-100 text-orange-600"
      case "yellow":
        return "bg-yellow-100 text-yellow-600"
      case "green":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getChangeColorClass = (change: string) => {
    switch (change) {
      case "改善":
        return "text-green-600"
      case "恶化":
        return "text-red-600"
      case "持平":
        return "text-amber-600"
      case "首次":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "改善":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        )
      case "恶化":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )
      case "持平":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M8 12h8" />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        )
    }
  }

  const filteredTests = Object.values(assessmentData).filter((test) => {
    if (filterCategory === "all") return true
    return test.category === filterCategory
  })

  const getColorBgClass = (color: string) => {
    switch (color) {
      case "pink":
        return "bg-[#f39b98]"
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
      <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
        {(activeTest && !showResult) || showTestDetail ? (
          <>
            <button
              onClick={() => {
                if (showTestDetail) {
                  setShowTestDetail(false)
                  setSelectedTestDetail(null)
                } else {
                  setActiveTest(null)
                }
              }}
              className="flex items-center text-[#f39b98]"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>返回</span>
            </button>
            <h1 className="text-lg font-medium">心理测评</h1>
            <div className="w-8"></div> {/* 占位 */}
          </>
        ) : (
          <>
            <h1 className="text-lg font-medium">心理测评</h1>
            <button className="text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </>
        )}
      </header>

      <div className="flex-1 overflow-auto pb-16">
        {activeTest ? (
          <div className="p-4">
            {showResult && testResult ? (
              // 测评结果页面
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-[#f39b98] to-[#f7b5b3] text-white">
                  <h2 className="text-xl font-bold mb-1">{testResult.title}</h2>
                  <p className="text-sm opacity-90">测评完成时间: {testResult.date}</p>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-bold">测评结果</div>
                    <div className="text-2xl font-bold text-[#f39b98]">{testResult.level}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>得分</span>
                      <span>
                        {testResult.score}/{testResult.maxScore}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#f39b98] rounded-full"
                        style={{ width: `${(testResult.score / testResult.maxScore) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-[#fff9e6] rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">结果解释</h3>
                    <p className="text-sm text-gray-700 mb-3">{testResult.description}</p>
                    <h3 className="font-medium mb-2">建议</h3>
                    <p className="text-sm text-gray-700">{testResult.suggestions}</p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Button onClick={finishTest} className="bg-[#f39b98] hover:bg-[#f7b5b3]">
                      完成
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (testResult) {
                          setActiveTest(testResult.testId)
                          setCurrentQuestion(1)
                          setProgress(calculateProgress(1, assessmentData[testResult.testId].totalQuestions))
                          setAnswers({})
                          setShowResult(false)
                        }
                      }}
                    >
                      重新测试
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // 测评问题页面
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold">{activeTest && assessmentData[activeTest]?.title}</h2>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      问题 {currentQuestion}/{activeTest && assessmentData[activeTest]?.totalQuestions}
                    </div>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-200 [&>div]:bg-[#f39b98]" />
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    {activeTest && assessmentData[activeTest]?.questions[currentQuestion - 1] && (
                      <div>
                        <h3 className="font-medium mb-4">
                          {currentQuestion}. {assessmentData[activeTest].questions[currentQuestion - 1].text}
                        </h3>
                        <RadioGroup
                          value={answers[currentQuestion]?.toString() || ""}
                          onValueChange={(value) => handleAnswer(currentQuestion, value)}
                        >
                          {assessmentData[activeTest].questions[currentQuestion - 1].options.map((option: Option, index: number) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 mb-2 p-3 rounded hover:bg-[#fff8f8] border border-gray-200 hover:border-[#f39b98] transition-all"
                            >
                              <RadioGroupItem value={option.value} id={`r${index}`} className="border-[#f39b98] text-[#f39b98]" />
                              <Label htmlFor={`r${index}`} className="flex-1">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTest(null)}>
                    退出测试
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    className="bg-[#f39b98] hover:bg-[#f7b5b3]"
                    disabled={answers[currentQuestion] === undefined}
                  >
                    {currentQuestion < (activeTest && assessmentData[activeTest]?.totalQuestions || 0) ? "下一题" : "完成测试"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : showTestDetail && selectedTestDetail ? (
          // 测评详情页面
          <div className="p-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div
                className="p-5 text-white bg-gradient-to-r from-[#f39b98] to-[#f7b5b3]"
              >
                <h2 className="text-xl font-bold mb-1">{selectedTestDetail.title}</h2>
                <p className="text-sm opacity-90">测评完成时间: {selectedTestDetail.date}</p>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-bold">测评结果</div>
                  <div className="text-2xl font-bold text-[#f39b98]">{selectedTestDetail.level}</div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>得分</span>
                    <span>{selectedTestDetail.score}/15</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#f39b98]"
                      style={{ width: `${(selectedTestDetail.score / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#fff9e6] rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-2">结果解释</h3>
                  <p className="text-sm text-gray-700 mb-3">{selectedTestDetail.description}</p>
                  <h3 className="font-medium mb-2">建议</h3>
                  <p className="text-sm text-gray-700">{selectedTestDetail.suggestions}</p>
                </div>

                {/* 测评趋势 */}
                <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-[#f39b98]" />
                      <h3 className="text-lg font-medium">测评趋势</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChartType("line")}
                        className={`p-2 rounded ${
                          chartType === "line" ? "bg-[#fff8f8] text-[#f39b98]" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setChartType("bar")}
                        className={`p-2 rounded ${
                          chartType === "bar" ? "bg-[#fff8f8] text-[#f39b98]" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {chartType === "line" ? (
                    <TrendChart
                      data={selectedTestDetail.history}
                      maxScore={15}
                      color="#f39b98"
                      title="分数变化趋势"
                    />
                  ) : (
                    <BarChartComponent
                      data={selectedTestDetail.history}
                      maxScore={15}
                      color="#f39b98"
                      title="分数变化趋势"
                    />
                  )}

                  <div className="text-sm text-gray-500 text-center mt-4">
                    {selectedTestDetail.history.length > 1 ? (
                      <p>
                        与上次相比
                        <span
                          className={
                            selectedTestDetail.change === "改善"
                              ? "text-green-500"
                              : selectedTestDetail.change === "恶化"
                                ? "text-red-500"
                                : "text-[#f39b98]"
                          }
                        >
                          {" " + selectedTestDetail.change + " "}
                        </span>
                        {selectedTestDetail.previousScore !== undefined &&
                          ` (${selectedTestDetail.score} vs ${selectedTestDetail.previousScore})`}
                      </p>
                    ) : (
                      <p>首次测评，暂无趋势数据</p>
                    )}
                  </div>
                </div>

                {/* 测评详情 */}
                <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-5 w-5 mr-2 text-[#f39b98]" />
                    <h3 className="text-lg font-medium">测评详情</h3>
                  </div>

                  <div className="space-y-4">
                    {selectedTestDetail.answers.map((item, index) => (
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

                <div className="flex flex-col space-y-3">
                  <Button onClick={() => setShowTestDetail(false)} className="bg-[#f39b98] hover:bg-[#f7b5b3]">
                    返回
                  </Button>
                  <Button variant="outline" onClick={() => startTest(selectedTestDetail.testId)}>
                    重新测试
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4 bg-white rounded-full h-10 p-1">
                <TabsTrigger
                  value="available"
                  className="rounded-full flex-1 text-sm data-[state=active]:bg-[#f39b98] data-[state=active]:text-white"
                >
                  可用测评
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-full flex-1 text-sm data-[state=active]:bg-[#f39b98] data-[state=active]:text-white"
                >
                  测评历史
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">选择测评量表</h2>
                  <div className="relative">
                    <button className="flex items-center text-sm text-gray-600 bg-white rounded-full px-3 py-1 border">
                      <Filter className="h-4 w-4 mr-1" />
                      {filterCategory === "all" ? "全部分类" : filterCategory}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredTests.map((test) => (
                    <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4">
                        <div className={`${getColorClass(test.color)} text-xs px-2 py-1 rounded-full w-fit mb-2`}>
                          {test.category}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{test.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {test.time}
                          </div>
                          <div className="flex items-center">
                            <BarChart className="h-4 w-4 mr-1" />
                            {test.totalQuestions}个问题
                          </div>
                        </div>
                        <Button className="w-full bg-[#f39b98] hover:bg-[#f7b5b3]" onClick={() => startTest(test.id)}>
                          开始测评
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 专家卡片 */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:w-1/3">
                      <Image 
                        src="/assets/人物.png" 
                        alt="专家照片" 
                        width={300} 
                        height={200}
                        className="rounded-lg object-cover w-full h-auto"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2b7cd3] mb-1">阿尔伯特·班杜拉</h3>
                      <p className="text-gray-500 text-sm mb-2">(1925—2021年7月28日)</p>
                      <p className="text-gray-600 text-sm">
                        新为主义的主要人物之一，社会学习理论的创始人，认知理论之父阿尔伯特·班杜拉，美国当代著名心理学家。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">测评历史记录</h2>
                  <div className="text-sm text-gray-500">共{testHistory.length}条记录</div>
                </div>

                {testHistory.length > 0 ? (
                  <div className="space-y-4">
                    {testHistory.map((test) => (
                      <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{test.title}</h3>
                            <span className="text-xs text-gray-500">{test.date}</span>
                          </div>

                          <div className="flex justify-between items-center mb-3">
                            <div className={`${getColorClass(test.color)} text-xs px-2 py-1 rounded-full`}>
                              {test.level}
                            </div>
                            <div className={`text-xs flex items-center ${getChangeColorClass(test.change)}`}>
                              {getChangeIcon(test.change)}
                              {test.change}
                              {test.previousScore !== undefined && (
                                <span className="ml-1">
                                  ({test.score} vs {test.previousScore})
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>得分</span>
                              <span>{test.score}/15</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#f39b98]"
                                style={{ width: `${(test.score / 15) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-[#f39b98] hover:bg-[#f7b5b3] text-xs h-8"
                              onClick={() => viewTestDetail(test)}
                            >
                              查看详情
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs h-8"
                              onClick={() => startTest(test.testId)}
                            >
                              重新测试
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">暂无测评记录</h3>
                    <p className="text-gray-500 mb-4">完成一次心理测评，了解你的心理健康状况</p>
                    <Button className="bg-[#f39b98] hover:bg-[#f7b5b3]" onClick={() => setActiveTab("available")}>
                      去测评
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
