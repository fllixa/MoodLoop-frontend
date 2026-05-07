"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { useTheme } from "next-themes";

export function FloatingContactButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const email = "moodloop@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleMailto = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-full right-0 mb-3 rounded-lg shadow-lg overflow-hidden ${
              isDark
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900 border border-gray-200"
            }`}
          >
            {/* Tooltip Content */}
            <div className="p-3 space-y-2 min-w-max">
              <p className="text-sm font-medium">{email}</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium ${
                    isDark
                      ? "bg-[#614EA9] hover:bg-[#2C2A4A] text-white"
                      : "bg-gradient-to-r from-[#614EA9] to-[#7B63B8] hover:from-[#2C2A4A] hover:to-[#614EA9] text-white"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMailto}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium ${
                    isDark
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-slate-900"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </motion.button>
              </div>
            </div>
            
            {/* Arrow pointing to button */}
            <div
              className={`absolute bottom-0 right-6 w-2 h-2 transform rotate-45 translate-y-1 ${
                isDark ? "bg-slate-900" : "bg-white border-r border-b border-gray-200"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={
          isDark
            ? { scale: 1.12, boxShadow: "0 20px 30px rgba(97, 78, 169, 0.4)" }
            : { scale: 1.12, boxShadow: "0 20px 30px rgba(97, 78, 169, 0.3)" }
        }
        whileTap={{ scale: 0.95 }}
        onClick={handleMailto}
        className={`relative w-14 h-14 rounded-full text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-[#614EA9] to-[#2C2A4A]"
            : "bg-gradient-to-br from-[#C3B4FF] to-[#614EA9] hover:from-[#614EA9] hover:to-[#2C2A4A]"
        }`}
      >
        <Mail className="h-6 w-6" strokeWidth={2} />
        
        {/* Pulse animation on first load */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 bg-transparent ${
            isDark ? "border-[#614EA9]" : "border-[#614EA9]"
          }`}
          animate={{
            scale: [1, 1.3],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
}
