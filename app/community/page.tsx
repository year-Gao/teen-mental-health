"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageSquare,
  Share2,
  PlusCircle,
  Search,
  ImageIcon,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  Coffee,
  Tag,
  ArrowLeft,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import BottomNav from "@/components/bottom-nav"

export default function Community() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("recommend")
  const [activeCategory, setActiveCategory] = useState("all")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [anonymousName, setAnonymousName] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newComment, setNewComment] = useState("")
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "如何应对考试焦虑？",
      content:
        "最近期末考试快到了，我感到非常焦虑，晚上睡不好觉，白天也无法集中注意力学习。有没有人和我有类似的经历？你们是怎么克服的？",
      author: "anxious_student",
      avatar: "/placeholder-user.svg",
      likes: 24,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: "helpful_friend",
          avatar: "/placeholder-user.svg",
          content: "我之前也有过类似的经历，试试深呼吸和冥想，每天睡前做10分钟，很有帮助！",
          time: "1小时前",
          likes: 5,
          isLiked: false,
        },
        {
          id: 2,
          author: "study_buddy",
          avatar: "/placeholder-user.svg",
          content: "建议制定一个详细的复习计划，把大任务分解成小目标，这样不会感到那么overwhelming。",
          time: "30分钟前",
          likes: 3,
          isLiked: false,
        },
      ],
      time: "2小时前",
      tags: ["焦虑", "学习压力", "考试"],
      mood: "worried",
      moodIcon: <Frown className="h-4 w-4 text-amber-500" />,
      category: "学业压力",
    },
    {
      id: 2,
      title: "分享：我是如何走出抑郁的",
      content:
        "去年我被诊断出轻度抑郁，经过半年的心理咨询和自我调节，现在已经好多了。想分享一下我的经历，希望能帮助到有类似经历的朋友。",
      author: "healing_journey",
      avatar: "/placeholder-user.svg",
      likes: 56,
      isLiked: false,
      comments: [
        {
          id: 3,
          author: "grateful_reader",
          avatar: "/placeholder-user.svg",
          content: "谢谢你的分享，给了我很大的勇气。能具体说说是什么方法帮助你走出来的吗？",
          time: "2小时前",
          likes: 8,
          isLiked: false,
        },
      ],
      time: "昨天",
      tags: ["抑郁", "恢复", "心理健康"],
      mood: "happy",
      moodIcon: <Smile className="h-4 w-4 text-green-500" />,
      category: "情绪管理",
    },
    {
      id: 3,
      title: "和父母沟通的困难",
      content:
        "我感觉我和父母之间有一道无形的墙，很难真正地交流。每次想谈心都变成了他们的说教。有什么建议可以改善亲子沟通吗？",
      author: "seeking_connection",
      avatar: "/placeholder-user.svg",
      likes: 32,
      isLiked: false,
      comments: [
        {
          id: 4,
          author: "wise_advisor",
          avatar: "/placeholder-user.svg",
          content: "试试选择合适的时机，比如一起散步或者做家务的时候，氛围会比较轻松。",
          time: "1天前",
          likes: 12,
          isLiked: false,
        },
        {
          id: 5,
          author: "understanding_parent",
          avatar: "/placeholder-user.svg",
          content: "作为家长，我觉得可能是我们表达方式有问题。你可以试着告诉父母你希望他们怎么和你交流。",
          time: "1天前",
          likes: 15,
          isLiked: false,
        },
      ],
      time: "3天前",
      tags: ["亲子关系", "沟通", "家庭"],
      mood: "neutral",
      moodIcon: <Meh className="h-4 w-4 text-blue-500" />,
      category: "人际关系",
    },
  ])

  const moods = [
    { id: "happy", label: "开心", icon: <Smile className="h-5 w-5 text-green-500" /> },
    { id: "neutral", label: "平静", icon: <Meh className="h-5 w-5 text-blue-500" /> },
    { id: "worried", label: "担忧", icon: <Frown className="h-5 w-5 text-amber-500" /> },
    { id: "stressed", label: "压力", icon: <AlertCircle className="h-5 w-5 text-orange-500" /> },
    { id: "tired", label: "疲惫", icon: <Coffee className="h-5 w-5 text-purple-500" /> },
  ]

  const categories = [
    { id: "all", label: "全部" },
    { id: "学业压力", label: "学业压力" },
    { id: "情绪管理", label: "情绪管理" },
    { id: "人际关系", label: "人际关系" },
    { id: "社交焦虑", label: "社交焦虑" },
    { id: "自我成长", label: "自我成长" },
  ]

  const handleLikePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const updatedPost = {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
          // 如果当前查看的是这个帖子，也更新selectedPost
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updatedPost)
          }
          return updatedPost
        }
        return post
      }),
    )
  }

  const handleLikeComment = (postId: number, commentId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
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
        return post
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

    setPosts(
      posts.map((post) => {
        if (post.id === selectedPost?.id) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }
        return post
      }),
    )

    setNewComment("")
  }

  const handleSubmitPost = () => {
    if (postTitle.trim() && postContent.trim() && anonymousName.trim() && selectedCategory) {
      const newPost = {
        id: posts.length + 1,
        title: postTitle,
        content: postContent,
        author: anonymousName,
        avatar: "/placeholder-user.svg",
        likes: 0,
        isLiked: false,
        comments: [],
        time: "刚刚",
        tags: [],
        mood: selectedMood,
        moodIcon: moods.find((m) => m.id === selectedMood)?.icon || null,
        category: selectedCategory,
      }

      setPosts([newPost, ...posts])
      setPostTitle("")
      setPostContent("")
      setAnonymousName("")
      setSelectedMood("")
      setSelectedCategory("")
      setIsPostDialogOpen(false)
    }
  }

  const filteredPosts = activeCategory === "all" ? posts : posts.filter((post) => post.category === activeCategory)

  if (showComments && selectedPost) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <header className="px-5 py-4 flex items-center bg-white border-b sticky top-0 z-10">
          <button onClick={() => setShowComments(false)} className="flex items-center text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-medium ml-4">评论详情</h1>
        </header>

        <div className="flex-1 overflow-auto pb-20">
          {/* 原帖内容 */}
          <div className="bg-white p-4 border-b">
            <div className="flex items-center mb-3">
              <Image
                src={selectedPost.avatar || "/placeholder.svg"}
                alt={selectedPost.author}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{selectedPost.author}</div>
                <div className="text-xs text-gray-500">{selectedPost.time}</div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">{selectedPost.title}</h3>
            <p className="text-gray-700 mb-3">{selectedPost.content}</p>
            <div className="flex justify-between border-t pt-3">
              <button
                className={`flex items-center gap-1 ${selectedPost.isLiked ? "text-red-500" : "text-gray-500"}`}
                onClick={() => handleLikePost(selectedPost.id)}
              >
                <Heart className={`h-5 w-5 ${selectedPost.isLiked ? "fill-current" : ""}`} />
                <span>{selectedPost.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="h-5 w-5" />
                <span>{selectedPost.comments.length}</span>
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
              <h3 className="font-medium">评论 ({selectedPost.comments.length})</h3>
            </div>
            {selectedPost.comments.map((comment: any) => (
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
                      onClick={() => handleLikeComment(selectedPost.id, comment.id)}
                    >
                      <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                className="bg-[#4CAF50] hover:bg-[#45a049] h-10 w-10 p-0"
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

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <header className="px-5 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
        <h1 className="text-lg font-medium bg-gradient-to-r from-[#2196F3] to-[#4CAF50] bg-clip-text text-transparent">心理社区</h1>
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <Search className="h-5 w-5" />
          </button>
          {user && (
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-[#4CAF50] text-white rounded-full p-1">
                  <PlusCircle className="h-5 w-5" />
                </button>
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
                      className="focus:border-[#4CAF50]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-title">标题</Label>
                    <Input
                      id="post-title"
                      placeholder="请输入帖子标题"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="focus:border-[#4CAF50]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">分类</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择帖子分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>当前心情</Label>
                    <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="flex flex-wrap gap-2">
                      {moods.map((mood) => (
                        <div key={mood.id} className="flex items-center">
                          <RadioGroupItem value={mood.id} id={`mood-${mood.id}`} className="peer sr-only" />
                          <Label
                            htmlFor={`mood-${mood.id}`}
                            className="flex items-center gap-1 px-3 py-2 rounded-full border border-gray-200 
                                      peer-data-[state=checked]:border-[#4CAF50] peer-data-[state=checked]:bg-[#e8f5e9]"
                          >
                            {mood.icon}
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
                      className="focus:border-[#4CAF50]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="icon" className="rounded-full">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <span className="text-xs text-gray-500">添加图片</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:bg-[#45a049] transition-transform hover:translate-y-[-2px]"
                    onClick={handleSubmitPost}
                    disabled={!postTitle.trim() || !postContent.trim() || !anonymousName.trim() || !selectedCategory}
                  >
                    发布
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-16">
        <div className="p-4">
          <Tabs defaultValue="recommend" className="w-full">
            <TabsList className="w-full mb-4 bg-white rounded-full h-10 p-1">
              <TabsTrigger
                value="recommend"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
                onClick={() => setActiveTab("recommend")}
              >
                推荐
              </TabsTrigger>
              <TabsTrigger
                value="latest"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
                onClick={() => setActiveTab("latest")}
              >
                最新
              </TabsTrigger>
              <TabsTrigger
                value="hot"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
                onClick={() => setActiveTab("hot")}
              >
                热门
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="rounded-full flex-1 text-sm data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
                onClick={() => setActiveTab("following")}
              >
                关注
              </TabsTrigger>
            </TabsList>

            {/* Categories */}
            <div className="mb-4 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                      activeCategory === category.id
                        ? "bg-[#4CAF50] text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.id === "all" ? (
                      "全部"
                    ) : (
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        {category.label}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:translate-y-[-3px] transition-transform duration-300">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Image
                        src={post.avatar || "/placeholder.svg"}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{post.author}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          {post.time}
                          {post.moodIcon && (
                            <span className="flex items-center gap-1 ml-2">
                              {post.moodIcon}
                              <span className="text-xs">{moods.find((m) => m.id === post.mood)?.label || ""}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bg-[#e8f5e9] text-[#4CAF50] text-xs px-2 py-1 rounded-full">{post.category}</div>
                    </div>

                    <h3
                      className="font-bold text-lg mb-2 cursor-pointer hover:text-[#4CAF50] transition-colors"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowComments(true)
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-gray-700 mb-3 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowComments(true)
                      }}
                    >
                      {post.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between border-t pt-3">
                      <button
                        className={`flex items-center gap-1 ${post.isLiked ? "text-red-500" : "text-gray-500"}`}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        className="flex items-center gap-1 text-gray-500"
                        onClick={() => {
                          setSelectedPost(post)
                          setShowComments(true)
                        }}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500">
                        <Share2 className="h-5 w-5" />
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
