"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, X } from "lucide-react";

const SUPPORT_EMAIL = "moodloop@gmail.com";

export function ContactUs() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        title="Contact Support"
      >
        <Mail className="w-6 h-6" strokeWidth={1.5} />
      </motion.button>

      {/* Popup Card */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-20 right-0 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 w-64 max-w-sm"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm pr-6">
              Get in Touch
            </h3>
            
            <div className="flex gap-2">
              {/* Email Link */}
              <motion.a
                href={`mailto:${SUPPORT_EMAIL}`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <Mail className="w-3 h-3" />
                <span>Email Us</span>
              </motion.a>

              {/* Copy Button */}
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-medium rounded-lg transition-all border border-slate-200 dark:border-slate-700"
                title="Copy email"
              >
                {!copied ? (
                  <Copy className="w-4 h-4" />
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-4 h-4 text-green-500" />
                  </motion.div>
                )}
              </motion.button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {SUPPORT_EMAIL}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

