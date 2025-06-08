"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Edit, Bookmark, History, Clock, User, X, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/bottom-nav"

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name:"来一块year糕呗",
    bio: "我都说了我没病，你们为什么不信呢？",
    avatar: "/assets/myswl-img/用户.jpg",
    interests: ["心理学", "阅读", "音乐"],
  })
  const [editName, setEditName] = useState(userProfile.name)
  const [editBio, setEditBio] = useState(userProfile.bio)
  const [selectedInterests, setSelectedInterests] = useState(userProfile.interests)

  // 发帖相关状态
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [anonymousName, setAnonymousName] = useState("")
  const [myPosts, setMyPosts] = useState([
    {
      id: 1,
      title: "分享一些缓解焦虑的小技巧",
      content:
        "最近学会了一些很有效的缓解焦虑的方法，想和大家分享一下。首先是深呼吸法，当感到焦虑时，慢慢吸气4秒，屏住4秒，然后呼气6秒，重复几次就会感觉好很多。还有就是5-4-3-2-1接地技巧，说出5样能看到的、4样能触摸的、3样能听到的、2样能闻到的、1样能尝到的东西，这样能帮助我们回到当下。",
      author: "心理小助手",
      category: "情绪管理",
      mood: "happy",
      time: "2天前",
      likes: 23,
      comments: 8,
      tags: ["焦虑", "技巧", "分享"],
    },
    {
      id: 2,
      title: "如何与室友建立良好关系？",
      content:
        "刚开学的时候和室友关系不太好，经常因为一些小事产生矛盾。后来我主动和她们沟通，制定了一些宿舍规则，比如作息时间、卫生轮值等。现在我们相处得很融洽，还经常一起学习和娱乐。我觉得主动沟通和相互理解真的很重要。",
      author: "宿舍和谐使者",
      category: "人际关系",
      mood: "neutral",
      time: "1周前",
      likes: 15,
      comments: 12,
      tags: ["室友", "沟通", "人际关系"],
    },
    {
      id: 3,
      title: "期中考试压力山大，求安慰",
      content:
        "下周就要期中考试了，感觉压力好大。每天都在图书馆学习到很晚，但还是觉得准备不充分。有时候会失眠，有时候会突然很想哭。大家有什么好的减压方法吗？或者有人和我一样焦虑的吗？",
      author: "焦虑的考试党",
      category: "学业压力",
      mood: "worried",
      time: "2周前",
      likes: 31,
      comments: 18,
      tags: ["考试", "压力", "焦虑"],
    },
    {
      id: 4,
      title: "推荐一本很棒的心理学书籍",
      content:
        "最近读了《情绪急救》这本书，觉得特别有用。书里介绍了很多处理负面情绪的实用方法，比如如何应对拒绝、失败、孤独等。作者用很生动的例子和简单的语言解释了复杂的心理学概念。强烈推荐给大家！",
      author: "读书爱好者",
      category: "自我成长",
      mood: "happy",
      time: "3周前",
      likes: 19,
      comments: 6,
      tags: ["书籍推荐", "心理学", "成长"],
    },
  ])

  const availableInterests = [
    "心理学",
    "阅读",
    "音乐",
    "电影",
    "旅行",
    "摄影",
    "绘画",
    "运动",
    "烹饪",
    "写作",
    "冥想",
    "瑜伽",
    "编程",
    "游戏",
  ]

  const categories = [
    { id: "学业压力", label: "学业压力" },
    { id: "情绪管理", label: "情绪管理" },
    { id: "人际关系", label: "人际关系" },
    { id: "社交焦虑", label: "社交焦虑" },
    { id: "自我成长", label: "自我成长" },
  ]

  const moods = [
    { id: "happy", label: "开心", icon: "😊" },
    { id: "neutral", label: "平静", icon: "😐" },
    { id: "worried", label: "担忧", icon: "😟" },
    { id: "stressed", label: "压力", icon: "😰" },
    { id: "tired", label: "疲惫", icon: "😴" },
  ]

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
          <h1 className="text-lg font-medium">个人中心</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">请先登录</h2>
          <p className="text-gray-500 mb-6 text-center">登录后可以查看个人资料、发布帖子和管理收藏</p>
          <div className="space-y-3 w-full max-w-xs">
            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => router.push("/login")}>
              登录
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/register")}>
              注册新账号
            </Button>
          </div>
        </div>
        <BottomNav />
      </main>
    )
  }

  const handleSaveProfile = () => {
    if (editName.trim()) {
      setUserProfile({
        ...userProfile,
        name: editName,
        bio: editBio,
        interests: selectedInterests,
      })
      setIsEditDialogOpen(false)
    }
  }

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest))
  }

  const handleSubmitPost = () => {
    if (postTitle.trim() && postContent.trim() && anonymousName.trim() && selectedCategory) {
      const newPost = {
        id: myPosts.length + 1,
        title: postTitle,
        content: postContent,
        author: anonymousName,
        category: selectedCategory,
        mood: selectedMood,
        time: "刚刚",
        likes: 0,
        comments: 0,
        tags: [],
      }

      setMyPosts([newPost, ...myPosts])
      setPostTitle("")
      setPostContent("")
      setAnonymousName("")
      setSelectedCategory("")
      setSelectedMood("")
      setIsPostDialogOpen(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
        <h1 className="text-lg font-medium">个人中心</h1>
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <Settings className="h-5 w-5" />
          </button>
          <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-8" onClick={logout}>
            退出登录
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-16">
        <div className="bg-[#42b983] p-5">
          <div className="flex items-center">
            <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center text-[#42b983] border-2 border-white overflow-hidden">
              <Image 
                src="/assets/myswl-img/用户.jpg" 
                alt="用户头像" 
                width={70} 
                height={70} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="ml-4 text-white">
              <h2 className="font-bold text-xl">{userProfile.name}</h2>
              <p className="text-sm opacity-90">{userProfile.bio}</p>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="mt-2 bg-white/20 text-white hover:bg-white/30 border-0">
                    <Edit className="h-4 w-4 mr-1" />
                    编辑资料
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>编辑个人资料</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative">
                        <div className="w-[80px] h-[80px] bg-[#42b983]/10 rounded-full flex items-center justify-center text-[#42b983] overflow-hidden">
                          <Image 
                            src="/assets/myswl-img/用户.jpg" 
                            alt="用户头像" 
                            width={80} 
                            height={80} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-[#42b983] text-white rounded-full p-1">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">点击更换头像</span>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">昵称</Label>
                      <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea id="bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={3} />
                    </div>
                    <div className="grid gap-2">
                      <Label>兴趣标签</Label>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedInterests.map((interest) => (
                          <div
                            key={interest}
                            className="bg-[#42b983]/10 text-[#42b983] text-xs px-2 py-1 rounded-full flex items-center"
                          >
                            {interest}
                            <button
                              onClick={() => removeInterest(interest)}
                              className="ml-1 text-[#42b983] hover:text-[#2c3e50]"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {availableInterests.map((interest) => (
                            <button
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`text-xs px-2 py-1 rounded-full ${
                                selectedInterests.includes(interest)
                                  ? "bg-[#42b983] text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      取消
                    </Button>
                    <Button className="bg-[#42b983] hover:bg-[#3ca876]" onClick={handleSaveProfile}>
                      保存
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-white p-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="text-[#42b983] font-bold text-xl">{myPosts.length}</div>
            <div className="text-xs text-gray-500">发帖数</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#42b983] font-bold text-xl">5</div>
            <div className="text-xs text-gray-500">测评数</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#42b983] font-bold text-xl">3</div>
            <div className="text-xs text-gray-500">关注数</div>
          </div>
        </div>

        <div className="bg-white p-4 mb-4">
          <h3 className="text-sm font-medium mb-2">兴趣标签</h3>
          <div className="flex flex-wrap gap-1">
            {userProfile.interests.map((interest) => (
              <span key={interest} className="bg-[#42b983]/10 text-[#42b983] text-xs px-2 py-1 rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="activities">
            <TabsList className="w-full mb-4 bg-white rounded-full h-10 p-1">
              <TabsTrigger
                value="activities"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#42b983] data-[state=active]:text-white"
              >
                活动记录
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#42b983] data-[state=active]:text-white"
              >
                我的帖子
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#42b983] data-[state=active]:text-white"
              >
                我的收藏
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="mt-0 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#42b983]/10 flex items-center justify-center text-[#42b983] mr-3">
                    <History className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">完成了测评</div>
                    <div className="text-sm text-gray-500">2小时前</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="font-medium text-sm">《青少年抑郁自评量表》</h3>
                  <p className="text-xs text-gray-600 mt-1">结果：轻度抑郁倾向，建议关注情绪变化</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#42b983]/10 flex items-center justify-center text-[#42b983] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">发布了帖子</div>
                    <div className="text-sm text-gray-500">昨天</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="font-medium text-sm">《分享一些缓解焦虑的小技巧》</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    最近学会了一些很有效的缓解焦虑的方法，想和大家分享一下...
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#42b983]/10 flex items-center justify-center text-[#42b983] mr-3">
                    <Bookmark className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">收藏了文章</div>
                    <div className="text-sm text-gray-500">3天前</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="font-medium text-sm">《青少年常见心理问题及应对策略》</h3>
                  <p className="text-xs text-gray-600 mt-1">本文介绍了青少年常见的心理健康问题，包括焦虑、抑郁...</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">我的帖子 ({myPosts.length})</h3>
                  <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#42b983] hover:bg-[#3ca876]">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        发布新帖
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>发布新帖子</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="anonymous-name">匿名昵称</Label>
                          <Input
                            id="anonymous-name"
                            placeholder="给自己起个匿名名称"
                            value={anonymousName}
                            onChange={(e) => setAnonymousName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="post-title">标题</Label>
                          <Input
                            id="post-title"
                            placeholder="请输入帖子标题"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">分类</Label>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="选择帖子分类" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>当前心情</Label>
                          <RadioGroup
                            value={selectedMood}
                            onValueChange={setSelectedMood}
                            className="flex flex-wrap gap-2"
                          >
                            {moods.map((mood) => (
                              <div key={mood.id} className="flex items-center">
                                <RadioGroupItem value={mood.id} id={`mood-${mood.id}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`mood-${mood.id}`}
                                  className="flex items-center gap-1 px-3 py-2 rounded-full border border-gray-200 
                                            peer-data-[state=checked]:border-[#42b983] peer-data-[state=checked]:bg-[#42b983]"
                                >
                                  <span>{mood.icon}</span>
                                  <span>{mood.label}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="post-content">内容</Label>
                          <Textarea
                            id="post-content"
                            placeholder="分享你的想法..."
                            rows={5}
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                          取消
                        </Button>
                        <Button
                          className="bg-[#42b983] hover:bg-[#3ca876]"
                          onClick={handleSubmitPost}
                          disabled={
                            !postTitle.trim() || !postContent.trim() || !anonymousName.trim() || !selectedCategory
                          }
                        >
                          发布
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {myPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <span className="text-xs text-gray-500">{post.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#42b983]/10 text-[#42b983] text-xs px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        {post.mood && (
                          <span className="text-xs text-gray-500">
                            {moods.find((m) => m.id === post.mood)?.icon} {moods.find((m) => m.id === post.mood)?.label}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <div className="relative h-64">
                  <Image src="/assets/resource-img/情绪管理图解.jpg" alt="Article Image" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">青少年常见心理问题及应对策略</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    本文介绍了青少年常见的心理健康问题，包括焦虑、抑郁、社交恐惧等，并提供了实用的应对策略。
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10分钟阅读
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#42b983] p-0 h-auto">
                      阅读全文
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-64">
                  <Image src="/assets/resource-img/如何缓解焦虑情绪.jpg" alt="Article Image" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">如何提高自我认知和情绪管理能力</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    情绪管理是心理健康的重要组成部分，本文将帮助你了解自己的情绪模式，并学习有效的情绪调节技巧。
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      8分钟阅读
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#42b983] p-0 h-auto">
                      阅读全文
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
