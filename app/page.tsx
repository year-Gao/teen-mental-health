"use client"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ArrowRight, MessageCircle, Users, BookOpen, BarChart2, Sparkles, HeartHandshake } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-auto pb-16">
        <header className="px-5 py-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-[#B02C39] to-[#B02C39] rounded-full flex items-center justify-center overflow-hidden">
              <Image 
                src="/树.png" 
                alt="无声对白" 
                width={36} 
                height={36} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">
              <div className="font-semibold">无声对白</div>
              <div className="text-xs text-gray-500">青少年心理健康平台</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">欢迎, {user.username}</span>
                <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-8" onClick={logout}>
                  退出
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-[#B02C39] hover:bg-[#9a2732] text-white text-xs px-3 py-1 h-8"
                onClick={() => router.push("/login")}
              >
                登录/注册
              </Button>
            )}
          </div>
        </header>

        {/* Hero Section - 使用Novoice-say-web的渐变背景 */}
        <div className="relative h-[74vh] bg-gradient-to-r from-[#fff5f8] via-[#fff8f9] to-[#fffbf2] overflow-hidden">
          {/* 背景图片 - 虚化效果 */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(255,245,248,0.85)] z-10"></div>
            <Image 
              src="/assets/落日1.png"
              alt="背景图片"
              fill
              style={{ objectFit: 'cover' }}
              className="blur-[8px] scale-110 opacity-60"
              priority
            />
          </div>

          <div className="relative z-20 h-full flex flex-col-reverse md:flex-row px-6 items-center max-w-7xl mx-auto">
            {/* 左侧内容区域 - 在移动设备上显示在下方 */}
            <div className="w-full md:w-1/2 flex flex-col justify-center md:pr-8 py-6 md:py-0">
              <div className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-sm border border-white/50 max-w-[600px] mx-auto">
                <div className="text-[#B02C39] text-[18px] mb-4 md:mb-6 relative pl-[15px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[20px] before:bg-[#B02C39]">
                  无声对白-心灵智语
                </div>
                <h1 className="text-[32px] md:text-[36px] font-bold leading-[1.3] mb-4 md:mb-6 text-[#333]">
                  让矛盾在无声中消散
                </h1>
                <p className="text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#555] mb-6 md:mb-8 max-w-full">
                  谁都不愿意直面给那些给我们带来压力、不满却又确实不得不直面的人，矛盾无法避免，我们如何才能够让二者之间的矛盾，悄无声息的消失呢？
                </p>
                <div className="flex">
                  <Button
                    className="flex items-center justify-center py-[12px] md:py-[15px] px-[30px] md:px-[35px] text-black border border-solid border-black rounded-[50px] text-[15px] md:text-[16px] cursor-pointer transition-all duration-300 ease-in-out bg-white/80 hover:bg-[rgba(51,21,122,1)] hover:text-white hover:transform hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(51,21,122,0.2)]"
                    onClick={() => router.push("/chat")}
                  >
                    <span className="inline-flex items-center justify-center">开启心灵对话之旅</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 右侧图片区域 - 在移动设备上显示在上方 */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center py-4 md:py-0">
              <div className="relative w-full max-w-[450px] h-full md:h-[70%] rounded-3xl overflow-hidden shadow-xl border-4 border-white/80">
                <Image 
                  src="/assets/落日1.png"
                  alt="心灵对话"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
                  className="rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-8 bg-gradient-to-r from-[#fff5f8] via-[#fff8f9] to-[#fffbf2]">
          {/* Daily Quote */}
          <div className="bg-white rounded-xl p-6 mb-8 border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#ffcfd4] flex items-center justify-center mb-4 shadow-inner">
                <Sparkles className="h-6 w-6 text-[#B02C39]" />
              </div>
              <h2 className="text-xl font-bold mb-3">今日心语</h2>
              <p className="text-base text-gray-700 italic mb-3">"接纳自己的不完美，是通往内心平静的第一步。"</p>
              <div className="text-sm text-gray-500">— 心理学家 卡尔·罗杰斯</div>
            </div>
          </div>

          {/* Main CTA */}
          {!user && (
            <div className="bg-white rounded-xl p-5 mb-6 border border-[#ffcfd4]">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-[120px] h-[120px] mb-4">
                  {/* 装饰圆圈 */}
                  <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-dashed border-[#B02C39] top-0 left-0 animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-dashed border-[#ffcfd4] bottom-0 right-0 animate-[spin_15s_linear_infinite_reverse]"></div>
                  
                  {/* 主图片 */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] bg-white rounded-full overflow-hidden shadow-lg z-10 border-4 border-white">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/assets/湖.jpg" 
                        alt="无声对白" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1">开启心灵成长之旅</h2>
                <p className="text-sm text-gray-700 mb-4">注册账号，获取专属心理支持</p>
                <Button
                  className="bg-[#B02C39] hover:bg-[#9a2732] text-white px-6"
                  onClick={() => router.push("/register")}
                >
                  立即加入
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="space-y-6 mt-2">
            <h2 className="text-xl font-semibold text-center mb-4">我们能为你提供</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="bg-[#ffcfd4] w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <MessageCircle className="h-6 w-6 text-[#B02C39]" />
                </div>
                <h3 className="font-medium text-base mb-2">智能对话</h3>
                <p className="text-sm text-gray-600">随时倾诉，AI助手给予专业回应</p>
              </div>

              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="bg-[#ffcfd4] w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <Users className="h-6 w-6 text-[#B02C39]" />
                </div>
                <h3 className="font-medium text-base mb-2">心理社区</h3>
                <p className="text-sm text-gray-600">匿名交流，建立互助支持网络</p>
              </div>

              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="bg-[#ffcfd4] w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <BookOpen className="h-6 w-6 text-[#B02C39]" />
                </div>
                <h3 className="font-medium text-base mb-2">心理知识</h3>
                <p className="text-sm text-gray-600">专业资源，提升心理健康素养</p>
              </div>

              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="bg-[#ffcfd4] w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <BarChart2 className="h-6 w-6 text-[#B02C39]" />
                </div>
                <h3 className="font-medium text-base mb-2">心理测评</h3>
                <p className="text-sm text-gray-600">科学量表，了解自己的心理状态</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-center">用户心声</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ffcfd4] flex items-center justify-center text-[#B02C39] flex-shrink-0 shadow-sm text-base font-medium">
                    小
                  </div>
                  <div>
                    <div className="font-medium text-base mb-1">小雨同学</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "无声对白帮助我度过了高考前的焦虑期，每天和AI助手聊天让我感到平静，测评也让我更了解自己的情绪状态。"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-[#ffcfd4] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ffcfd4] flex items-center justify-center text-[#B02C39] flex-shrink-0 shadow-sm text-base font-medium">
                    阳
                  </div>
                  <div>
                    <div className="font-medium text-base mb-1">阳光男孩</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "社区里的匿名交流让我敢于表达自己的真实想法，发现原来很多人和我有一样的困惑，不再感到孤单。"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
