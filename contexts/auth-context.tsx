"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
  interests: string[]
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock用户数据
const mockUsers = [
  {
    id: "1",
    username: "demo_user",
    password: "123456",
    email: "demo@example.com",
    avatar: "/placeholder-user.svg",
    bio: "情绪专家 / 热心小助手",
    interests: ["心理学", "阅读", "音乐"],
  },
  {
    id: "2",
    username: "test",
    password: "test123",
    email: "test@example.com",
    avatar: "/placeholder-user.svg",
    bio: "心理健康爱好者",
    interests: ["冥想", "瑜伽", "写作"],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 检查本地存储中是否有用户信息
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const userInfo = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        avatar: foundUser.avatar,
        bio: foundUser.bio,
        interests: foundUser.interests,
      }
      setUser(userInfo)
      localStorage.setItem("currentUser", JSON.stringify(userInfo))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
