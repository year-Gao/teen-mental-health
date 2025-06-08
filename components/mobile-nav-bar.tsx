"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "社区/Community", href: "/community" },
  { name: "心聊/Talking", href: "/chat" },
  { name: "资源/Resources", href: "/resources" },
  { name: "新闻/News", href: "/news" },
  { name: "测试/Test", href: "/test" },
  { name: "成长/Develop", href: "/develop" },
]

export default function MobileNavBar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b overflow-x-auto">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "py-2 px-3 text-center whitespace-nowrap text-sm",
                isActive ? "text-rose-500 border-b-2 border-rose-500" : "text-gray-700",
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
