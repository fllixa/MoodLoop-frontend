"use client"

import { motion } from "framer-motion"
import { LogOut, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp, translations } from "@/lib/app-context"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export function Header() {
  const { user, logout, language, setLanguage } = useApp()
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-border/40 bg-card/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="MoodLoop"
            width={140}
            height={36}
            className="object-contain"
            priority
          />
          {user && (
            <span className="text-sm text-muted-foreground">
              {language === "en" ? "Welcome" : "مرحباً"}, {user.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle variant="inline" />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors whitespace-nowrap"
          >
            <Languages className="h-4 w-4" strokeWidth={1.5} />
            {language === "en" ? "العربية" : "English"}
          </Button>

          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              {t.logout}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  )
}
