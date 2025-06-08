"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import Image from "next/image"

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("请填写所有必填字段")
      return
    }
    
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }
    
    // 这里添加注册逻辑
    router.push("/community")
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-6" 
          style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)" }}>
      <div className="w-full max-w-5xl mx-4 flex flex-col md:flex-row bg-white/95 rounded-3xl overflow-hidden shadow-lg" 
           style={{ boxShadow: "0 15px 35px rgba(255, 107, 107, 0.1)" }}>
        
        {/* 移动端顶部图片区域 */}
        <div className="md:hidden w-full relative overflow-hidden" style={{ height: "180px" }}>
          <div style={{ 
            background: "linear-gradient(135deg, rgba(252, 228, 236, 0.9) 0%, rgba(227, 242, 253, 0.9) 100%)",
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden"
          }}>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <div className="mb-2">
                <img src="/树.png" alt="Logo" className="w-20 h-20 rounded-full shadow-md" 
                     style={{ boxShadow: "0 8px 16px rgba(255, 107, 107, 0.2)" }} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">JOIN US~</h1>
              <p className="text-sm text-gray-600">开启您的心灵成长之旅</p>
            </div>
            
            {/* 移动端背景树图案 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute" 
                   style={{ 
                     background: "url('/树.png') center/150% no-repeat",
                     width: "200%",
                     height: "200%",
                     top: "-50%",
                     left: "-50%",
                     opacity: "0.08",
                     animation: "gentle-float 15s ease-in-out infinite"
                   }}></div>
            </div>
          </div>
        </div>
        
        {/* 左侧欢迎区域（桌面端） */}
        <div className="w-1/2 relative overflow-hidden hidden md:block" 
             style={{ background: "linear-gradient(135deg, rgba(252, 228, 236, 0.9) 0%, rgba(227, 242, 253, 0.9) 100%)" }}>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-10">
            <div className="mb-6">
              <img src="/树.png" alt="Logo" className="w-28 h-28 rounded-full shadow-md" 
                   style={{ boxShadow: "0 8px 16px rgba(255, 107, 107, 0.2)" }} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">JOIN US~</h1>
            <p className="text-xl text-gray-600 mb-10">开启您的心灵成长之旅</p>
            
            <div className="space-y-4 w-full max-w-xs">
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">🌟</span>
                <span className="text-gray-700">个性化测评</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">💭</span>
                <span className="text-gray-700">专业咨询</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">📚</span>
                <span className="text-gray-700">成长社区</span>
              </div>
            </div>
          </div>
          
          {/* 桌面端背景树图案 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute" 
                 style={{ 
                   background: "url('/树.png') center/200% no-repeat",
                   width: "300%",
                   height: "300%",
                   top: "-100%",
                   left: "-100%",
                   opacity: "0.08",
                   animation: "gentle-float 20s ease-in-out infinite"
                 }}></div>
          </div>
        </div>
        
        {/* 右侧注册表单 */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white/95 relative z-10">
          <div className="md:hidden flex justify-start mb-4">
            <button onClick={() => router.back()} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">注册账号</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">创建您的个人账号，加入我们</p>
          </div>
          
          <div className="space-y-4 md:space-y-5">
            <div className="relative">
              <Input
                placeholder="用户名"
                className="pl-10 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-[#ff6b6b] focus:ring focus:ring-[rgba(255,107,107,0.1)]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="absolute left-3 top-3 md:top-3.5 text-gray-400">👤</span>
            </div>
            
            <div className="relative">
              <Input
                type="email"
                placeholder="邮箱"
                className="pl-10 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-[#ff6b6b] focus:ring focus:ring-[rgba(255,107,107,0.1)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute left-3 top-3 md:top-3.5 text-gray-400">✉️</span>
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="密码"
                className="pl-10 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-[#ff6b6b] focus:ring focus:ring-[rgba(255,107,107,0.1)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-3 md:top-3.5 text-gray-400">🔒</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 md:top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="确认密码"
                className="pl-10 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-[#ff6b6b] focus:ring focus:ring-[rgba(255,107,107,0.1)]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="absolute left-3 top-3 md:top-3.5 text-gray-400">🔒</span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 md:top-3.5 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {error && <div className="text-red-500 text-xs md:text-sm text-center">{error}</div>}
            
            <div className="pt-2 md:pt-4">
              <Button
                className="w-full h-10 md:h-12 text-sm md:text-base bg-[#ff6b6b] hover:bg-[#ff4757] transition-all transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
                onClick={handleRegister}
              >
                <span>注册</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Button>
              
              <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-gray-500">
                已有账号？{" "}
                <Link href="/login" className="text-[#ff6b6b] font-medium hover:underline">
                  立即登录
                </Link>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 text-center mt-4">
              注册即表示您同意我们的
              <Link href="/terms" className="text-[#ff6b6b] hover:underline mx-1">服务条款</Link>
              和
              <Link href="/privacy" className="text-[#ff6b6b] hover:underline mx-1">隐私政策</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部导航 */}
      <BottomNav />
    </main>
  )
}
