import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "社区/Community", href: "/community" },
  { name: "心聊/Talking", href: "/chat" },
  { name: "资源/Resources", href: "/resources" },
  { name: "新闻/News", href: "/news" },
  { name: "测试/Test", href: "/test" },
  { name: "成长/Develop", href: "/develop" },
]

export default function NavBar() {
  return (
    <nav className="bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto">
        <ul className="flex justify-between">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block py-4 px-4 text-center hover:bg-pink-50 transition-colors",
                  "text-gray-700 hover:text-rose-500",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
