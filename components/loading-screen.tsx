"use client"

import { motion } from "framer-motion"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [animationData, setAnimationData] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Fetch the animation JSON
    fetch("/assets/animation.json")
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load animation:", err))
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E8EAF6]">
      {/* Subtle radial glow */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse at center, rgba(195, 180, 255, 0.4) 0%, transparent 60%)"
        }}
      />
      
      <div className="relative flex flex-col items-center">
        {/* Lottie Animation */}
        {animationData && (
          <div className="w-60 h-60">
            <Lottie 
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        {!animationData && (
          <div className="relative w-40 h-40">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/40"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                  scale: [0.8, 1.5, 1.8],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ProcessingIndicator({ text = "Processing..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
      <div className="relative w-6 h-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  )
}
