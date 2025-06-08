"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Video, Headphones, Clock, ArrowLeft, Heart, MessageSquare, Share2, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import BottomNav from "@/components/bottom-nav"
import ReactMarkdown from "react-markdown"

// 定义类型
interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  time: string
  likes: number
  isLiked: boolean
}

interface Article {
  id: number
  title: string
  description: string
  image: string
  likes: number
  isLiked: boolean
  comments: Comment[]
  readTime: string
  content?: string
}

interface VideoItem {
  id: number
  title: string
  description: string
  image: string
  duration: string
}

interface AudioItem {
  id: number
  title: string
  description: string
  image: string
  duration: string
}

export default function Resources() {
  const { user } = useAuth()
  const [showArticleDetail, setShowArticleDetail] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "如何应对考试焦虑",
      description: "考试焦虑是很多学生面临的常见问题，本文提供实用的缓解方法。",
      image: "/assets/resource-img/如何缓解焦虑情绪.jpg",
      likes: 120,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: "学习小助手",
          avatar: "/placeholder-user.svg",
          content: "这篇文章写得很好，特别是关于深呼吸的部分，我试过真的有效！",
          time: "2小时前",
          likes: 8,
          isLiked: false,
        },
        {
          id: 2,
          author: "考试达人",
          avatar: "/placeholder-user.svg",
          content: "感谢分享，我会把这些方法推荐给我的同学们。",
          time: "1小时前",
          likes: 5,
          isLiked: false,
        },
      ],
      readTime: "5分钟",
      content: `# 如何应对考试焦虑

考试焦虑是许多学生在学习过程中面临的常见问题，尤其是在重要考试前。适度的紧张可以帮助我们保持警觉和专注，但过度的焦虑却会影响学习效率和考试表现。本文将介绍一些实用的方法来帮助你缓解考试焦虑。

## 什么是考试焦虑？

考试焦虑是一种在考试前或考试期间出现的紧张、担忧和恐惧感。它可能表现为：

- **身体症状**：心跳加速、出汗、肌肉紧张、头痛
- **认知症状**：注意力不集中、思维混乱、记忆力下降
- **情绪症状**：恐惧、担忧、烦躁、沮丧
- **行为症状**：失眠、食欲不振、回避学习

严重的考试焦虑甚至会导致失眠、食欲不振等问题，形成恶性循环。

## 考试焦虑的常见原因

### 1. 心理因素
- **对失败的恐惧**：担心考试成绩不理想，无法达到自己或他人的期望
- **完美主义倾向**：过高的自我要求和追求完美的心态
- **负面自我对话**："我一定会考砸"、"我不够聪明"等消极想法

### 2. 准备因素
- **准备不足**：对考试内容掌握不够，缺乏信心
- **学习方法不当**：效率低下的学习方式导致压力增大
- **时间管理不善**：临时抱佛脚，缺乏系统性复习

### 3. 环境因素
- **外部压力**：来自家长、老师或同学的期望和压力
- **过往经历**：之前的考试失败经历可能会增加对未来考试的焦虑
- **竞争环境**：过度的同伴竞争和比较

## 缓解考试焦虑的方法

### 1. 充分准备策略

#### 制定合理的学习计划
- 将学习内容分解成小块，每天完成一部分
- 设定具体、可达成的学习目标
- 留出充足的复习时间，避免临时抱佛脚
- 定期回顾和调整学习计划

#### 掌握有效的学习方法
- **主动学习**：通过提问、总结、教授他人来加深理解
- **分散学习**：将学习时间分散到多个时段，而不是集中突击
- **多感官学习**：结合视觉、听觉、动觉等多种感官
- **联想记忆**：建立知识点之间的联系，形成知识网络

#### 模拟考试环境
- 在家中模拟考试环境和时间限制
- 练习在有限时间内完成题目
- 熟悉考试流程和规则
- 提前适应考试氛围

### 2. 身体放松技巧

#### 深呼吸练习
1. 找一个安静舒适的地方坐下
2. 慢慢吸气4秒，让腹部鼓起
3. 屏住呼吸4秒
4. 慢慢呼气6秒，让腹部收缩
5. 重复10-15次

#### 渐进性肌肉放松
1. 从脚趾开始，依次绷紧身体各部位的肌肉
2. 保持紧张状态5秒钟
3. 突然放松，感受紧张和放松的区别
4. 逐步向上，直到头部
5. 最后全身放松，享受这种轻松感

#### 正念冥想
- 每天花5-10分钟进行冥想
- 专注于呼吸，观察思绪的来去
- 不判断，只是观察
- 逐渐培养内心的平静

### 3. 心理调适技巧

#### 积极自我对话
将消极想法转换为积极想法：
- "我一定会失败" → "我已经尽力准备了，我能行"
- "这次考试太重要了" → "这只是众多考试中的一次"
- "我不够聪明" → "我有自己的优势和能力"

#### 可视化成功
- 闭上眼睛，想象自己冷静自信地走进考场
- 想象自己从容地回答问题
- 想象自己取得满意成绩时的喜悦
- 每天练习5-10分钟

#### 接受不完美
- 理解并接受自己不可能事事完美
- 设定现实可达成的目标
- 将注意力集中在过程而非结果
- 学会从错误中学习

### 4. 健康生活习惯

#### 保持规律作息
- 确保每晚7-9小时的充足睡眠
- 建立固定的睡眠时间
- 避免熬夜学习，特别是考试前一晚
- 创造良好的睡眠环境

#### 均衡饮食
- 多吃富含维生素B的食物（全谷物、坚果）
- 适量摄入富含镁的食物（绿叶蔬菜、豆类）
- 避免过量咖啡因和糖分
- 保持规律的用餐时间

#### 适当运动
- 每天进行30分钟的中等强度运动
- 可以选择散步、慢跑、瑜伽或游泳
- 运动能释放内啡肽，改善情绪
- 也有助于改善睡眠质量

### 5. 考试当天的策略

#### 考前准备
- 提前到达考场，给自己留出足够的时间
- 准备好所有必需的考试用品
- 避免与同学讨论难题，以免增加焦虑
- 做几次深呼吸，让自己平静下来

#### 考试过程中
- 如果感到焦虑，停下来做几次深呼吸
- 将注意力带回到当前的题目上
- 先回答你有把握的题目，建立信心
- 合理分配时间，不要在难题上纠结太久

#### 应对突发情况
- 如果遇到不会的题目，不要恐慌
- 跳过难题，先完成其他题目
- 利用排除法等技巧
- 相信自己的第一直觉

## 何时寻求专业帮助

如果你的考试焦虑出现以下情况，建议寻求专业帮助：

- 严重影响日常生活和学习
- 出现恐慌发作症状
- 持续失眠或食欲不振
- 有自我伤害的想法
- 焦虑症状持续数周不缓解

专业帮助渠道包括：
- 学校心理咨询中心
- 心理健康专家
- 精神科医生
- 心理咨询师

## 结语

考试焦虑是可以管理和克服的。通过充分准备、学习放松技巧、调整心态和保持健康的生活习惯，你可以减轻焦虑，以更平静、自信的状态面对考试。

记住，考试只是人生旅途中的一小部分，它不能定义你的全部价值和未来。重要的是在这个过程中学会如何管理压力、建立自信，这
`,
    },
    {
      id: 2,
      title: "青少年常见心理问题",
      description: "了解青少年期常见的心理健康问题，及早识别和应对。",
      image: "/assets/resource-img/心理健康知识图谱.jpg",
      likes: 98,
      isLiked: false,
      comments: [
        {
          id: 3,
          author: "心理学爱好者",
          avatar: "/placeholder-user.svg",
          content: "很全面的总结，对家长和老师都很有帮助。",
          time: "3小时前",
          likes: 12,
          isLiked: false,
        },
      ],
      readTime: "8分钟",
    },
    {
      id: 3,
      title: "提高自信心的方法",
      description: "自信是成功的关键，这里有几个简单有效的方法帮助你建立自信。",
      image: "/assets/resource-img/提升自信心的实践方法.jpg",
      likes: 156,
      isLiked: false,
      comments: [],
      readTime: "6分钟",
    },
    {
      id: 4,
      title: "与父母有效沟通",
      description: "学习如何与父母进行有效沟通，建立健康的亲子关系。",
      image: "/assets/resource-img/治愈系插画集.jpg",
      likes: 110,
      isLiked: false,
      comments: [],
      readTime: "7分钟",
    },
  ])

  const videos = [
    {
      id: 1,
      title: "5分钟冥想练习",
      description: "简单易学的冥想技巧，帮助你缓解压力，提高专注力。",
      image: "/assets/resource-img/正念呼吸练习指导.jpg",
      duration: "5:23",
    },
    {
      id: 2,
      title: "情绪管理技巧",
      description: "学习如何识别和管理负面情绪，保持心理健康。",
      image: "/assets/resource-img/情绪管理图解.jpg",
      duration: "8:47",
    },
  ] as VideoItem[]

  const audios = [
    {
      id: 1,
      title: "深度放松引导冥想",
      description: "帮助你放松身心，缓解压力和焦虑的引导式冥想。",
      image: "/assets/resource-img/正念生活插画.jpg",
      duration: "15:30",
    },
    {
      id: 2,
      title: "睡前放松音乐",
      description: "舒缓的音乐帮助你放松身心，改善睡眠质量。",
      image: "/assets/resource-img/改善睡眠质量的10个小技巧.jpg",
      duration: "30:00",
    },
  ] as AudioItem[]

  const handleLikeArticle = (articleId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            likes: article.isLiked ? article.likes - 1 : article.likes + 1,
            isLiked: !article.isLiked,
          }
        }
        return article
      }),
    )
  }

  const handleLikeComment = (articleId: number, commentId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            comments: article.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                  isLiked: !comment.isLiked,
                }
              }
              return comment
            }),
          }
        }
        return article
      }),
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return

    const comment = {
      id: Date.now(),
      author: user.username,
      avatar: user.avatar,
      content: newComment,
      time: "刚刚",
      likes: 0,
      isLiked: false,
    }

    setArticles(
      articles.map((article) => {
        if (article.id === selectedArticle?.id) {
          return {
            ...article,
            comments: [...article.comments, comment],
          }
        }
        return article
      }),
    )

    setNewComment("")
  }

  if (showComments && selectedArticle) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f6f8ff] to-[#f0f3ff] flex flex-col">
        <header className="px-5 py-4 flex items-center bg-white border-b sticky top-0 z-10">
          <button onClick={() => setShowComments(false)} className="flex items-center text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-medium ml-4">评论详情</h1>
        </header>

        <div className="flex-1 overflow-auto pb-20">
          {/* 文章信息 */}
          <div className="bg-white p-4 border-b">
            <div className="relative h-64 mb-4">
              <Image
                src={selectedArticle.image || "/placeholder.svg"}
                alt={selectedArticle.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">{selectedArticle.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{selectedArticle.description}</p>
            <div className="flex justify-between border-t pt-3">
              <button
                className={`flex items-center gap-1 ${selectedArticle.isLiked ? "text-red-500" : "text-gray-500"}`}
                onClick={() => handleLikeArticle(selectedArticle.id)}
              >
                <Heart className={`h-5 w-5 ${selectedArticle.isLiked ? "fill-current" : ""}`} />
                <span>{selectedArticle.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="h-5 w-5" />
                <span>{selectedArticle.comments.length}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <Share2 className="h-5 w-5" />
                <span>分享</span>
              </button>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="bg-white">
            <div className="p-4 border-b">
              <h3 className="font-medium">评论 ({selectedArticle.comments.length})</h3>
            </div>
            {selectedArticle.comments.map((comment) => (
              <div key={comment.id} className="p-4 border-b">
                <div className="flex items-start gap-3">
                  <Image
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                    <button
                      className={`flex items-center gap-1 text-xs ${
                        comment.isLiked ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => handleLikeComment(selectedArticle.id, comment.id)}
                    >
                      <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {selectedArticle.comments.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>还没有评论，来发表第一条评论吧！</p>
              </div>
            )}
          </div>
        </div>

        {/* 评论输入框 */}
        {user && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="写下你的评论..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 h-10"
              />
              <Button
                onClick={handleAddComment}
                className="bg-gradient-to-r from-[#7c69ef] to-[#5d9cec] hover:from-[#6a59d1] hover:to-[#4c8bd9] h-10 w-10 p-0 border-none"
                size="icon"
                disabled={!newComment.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        <BottomNav />
      </main>
    )
  }

  if (showArticleDetail && selectedArticle) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f6f8ff] to-[#f0f3ff] flex flex-col">
        <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
          <button onClick={() => setShowArticleDetail(false)} className="flex items-center text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-medium">文章详情</h1>
          <div className="w-8"></div>
        </header>

        <div className="flex-1 overflow-auto pb-16">
          <div className="relative h-64">
            <Image
              src={selectedArticle.image || "/placeholder.svg"}
              alt={selectedArticle.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
              <h1 className="text-white text-2xl font-bold">{selectedArticle.title}</h1>
              <div className="flex items-center text-white/80 text-sm mt-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{selectedArticle.readTime}阅读</span>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="prose prose-sm max-w-none">
              {selectedArticle.content ? (
                <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-3">什么是考试焦虑？</h2>
                  <p className="mb-4">
                    考试焦虑是一种在考试前或考试期间出现的紧张、担忧和恐惧感。它可能表现为心跳加速、出汗、注意力不集中、思维混乱等症状。严重的考试焦虑甚至会导致失眠、食欲不振等问题。
                  </p>
                  <h2 className="text-xl font-bold mb-3">缓解考试焦虑的方法</h2>
                  <p className="mb-4">
                    通过充分准备、学习放松技巧、调整心态和保持健康的生活习惯，你可以减轻焦虑，以更平静、自信的状态面对考试。
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="flex items-center gap-4">
                <button
                  className={`flex items-center gap-1 ${selectedArticle.isLiked ? "text-red-500" : "text-gray-500"}`}
                  onClick={() => handleLikeArticle(selectedArticle.id)}
                >
                  <Heart className={`h-5 w-5 ${selectedArticle.isLiked ? "fill-current" : ""}`} />
                  <span>{selectedArticle.likes}</span>
                </button>
                <button
                  className="flex items-center gap-1 text-gray-500"
                  onClick={() => {
                    setShowComments(true)
                    setShowArticleDetail(false)
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{selectedArticle.comments.length}</span>
                </button>
              </div>
              <button className="flex items-center gap-1 text-gray-500">
                <Share2 className="h-5 w-5" />
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f6f8ff] to-[#f0f3ff] flex flex-col">
      <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-medium text-[#2c3e50]">心理资源</h1>
        <button className="text-[#7c69ef]">
          <Search className="h-5 w-5" />
        </button>
      </header>

      <div className="flex-1 overflow-auto pb-16">
        <div className="p-4">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="w-full mb-4 bg-white rounded-full h-10 p-1 shadow-md">
              <TabsTrigger
                value="articles"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c69ef] data-[state=active]:to-[#5d9cec] data-[state=active]:text-white transition-all"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                文章
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c69ef] data-[state=active]:to-[#5d9cec] data-[state=active]:text-white transition-all"
              >
                <Video className="h-4 w-4 mr-1" />
                视频
              </TabsTrigger>
              <TabsTrigger
                value="audios"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c69ef] data-[state=active]:to-[#5d9cec] data-[state=active]:text-white transition-all"
              >
                <Headphones className="h-4 w-4 mr-1" />
                音频
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-4 mt-0">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[rgba(124,105,239,0.1)] hover:shadow-md hover:translate-y-[-5px] transition-all">
                  <div className="relative h-64">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#7c69ef] to-[#5d9cec] text-white text-xs px-3 py-1 rounded-full shadow-md">
                      心理资源
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 text-[#2c3e50]">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.description}</p>
                    <div className="flex justify-between items-center mb-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}阅读
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className={`flex items-center gap-1 text-sm ${article.isLiked ? "text-red-500" : "text-gray-500"}`}
                          onClick={() => handleLikeArticle(article.id)}
                        >
                          <Heart className={`h-4 w-4 ${article.isLiked ? "fill-current" : ""}`} />
                          <span>{article.likes}</span>
                        </button>
                        <button
                          className="flex items-center gap-1 text-sm text-gray-500"
                          onClick={() => {
                            setSelectedArticle(article)
                            setShowComments(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{article.comments.length}</span>
                        </button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c69ef] to-[#5d9cec] p-0 h-auto w-full font-semibold"
                      onClick={() => {
                        setSelectedArticle(article)
                        setShowArticleDetail(true)
                      }}
                    >
                      阅读全文
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="space-y-4 mt-0">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[rgba(124,105,239,0.1)] hover:shadow-md hover:translate-y-[-5px] transition-all">
                  <div className="relative h-64">
                    <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-[#7c69ef] to-[#5d9cec] rounded-full p-3 bg-opacity-80 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white h-6 w-6"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[rgba(124,105,239,0.9)] to-[rgba(93,156,236,0.9)] text-white text-xs px-3 py-1 rounded-full shadow-md">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 text-[#2c3e50]">{video.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">2.3k 次观看</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-[#7c69ef]" /> 156
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="audios" className="space-y-4 mt-0">
              {audios.map((audio) => (
                <div key={audio.id} className="bg-white rounded-xl shadow-sm overflow-hidden p-4 flex border border-[rgba(124,105,239,0.1)] hover:shadow-md hover:translate-y-[-5px] transition-all">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-3">
                    <Image src={audio.image || "/placeholder.svg"} alt={audio.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1 text-[#2c3e50]">{audio.title}</h3>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{audio.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{audio.duration}</span>
                      <Button size="sm" className="h-8 bg-gradient-to-r from-[#7c69ef] to-[#5d9cec] hover:from-[#6a59d1] hover:to-[#4c8bd9] border-none">
                        <Headphones className="h-4 w-4 mr-1" />
                        播放
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
