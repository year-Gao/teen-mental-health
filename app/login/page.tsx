"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import BottomNav from "@/components/bottom-nav"
import Image from "next/image"

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("请输入用户名和密码")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/")
      } else {
        setError("用户名或密码错误")
      }
    } catch (err) {
      setError("登录失败，请重试")
    } finally {
      setIsLoading(false)
    }
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
              <h1 className="text-2xl font-bold text-gray-800 mb-1">WELCOME~</h1>
              <p className="text-sm text-gray-600">探索心灵的智慧之语</p>
            </div>
            
            {/* 移动端背景树图案 - 增大尺寸 */}
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">WELCOME~</h1>
            <p className="text-xl text-gray-600 mb-10">探索心灵的智慧之语</p>
            
            <div className="space-y-4 w-full max-w-xs">
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">🌟</span>
                <span className="text-gray-700">心理测评</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">💭</span>
                <span className="text-gray-700">心灵智语</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm transition transform hover:translate-x-2">
                <span className="text-2xl">📚</span>
                <span className="text-gray-700">在线咨询</span>
              </div>
            </div>
          </div>

          {/* 桌面端背景树图案 - 增大尺寸 */}
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
        
        {/* 右侧登录表单 */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white/95 relative z-10">
          <div className="md:hidden flex justify-start mb-4">
            <button onClick={() => router.back()} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">登录</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">欢迎回来，请登录您的账号</p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
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
                  type={showPassword ? "text" : "password"}
                placeholder="密码"
                className="pl-10 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-[#ff6b6b] focus:ring focus:ring-[rgba(255,107,107,0.1)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
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

            {error && <div className="text-red-500 text-xs md:text-sm text-center">{error}</div>}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-2 border-gray-300 text-[#ff6b6b] focus:ring-[rgba(255,107,107,0.1)]"
                />
                <label htmlFor="remember" className="text-xs md:text-sm text-gray-600">
                  记住我
                </label>
              </div>
              <Link href="/forgot-password" className="text-xs md:text-sm text-[#ff6b6b] hover:underline hover:text-[#ff4757]">
                忘记密码？
              </Link>
            </div>

              <Button
              className="w-full h-10 md:h-12 text-sm md:text-base bg-[#ff6b6b] hover:bg-[#ff4757] transition-all transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
                onClick={handleLogin}
                disabled={isLoading}
              >
              <span>{isLoading ? "登录中..." : "登录"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
              </Button>

            <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-gray-500">
              还没有账号？{" "}
              <Link href="/register" className="text-[#4CAF50] font-medium hover:underline">
                  立即注册
                </Link>
              </div>
          </div>
          
          {/* 演示账号提示 */}
          <div className="mt-6 md:mt-8 bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-medium text-amber-800 mb-1 md:mb-2">演示账号</h3>
            <div className="text-xs text-amber-700 space-y-0.5 md:space-y-1">
              <div>用户名: demo_user 密码: 123456</div>
              <div>用户名: test 密码: test123</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNav />
    </main>
  )
}
