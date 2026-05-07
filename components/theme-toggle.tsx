'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/light-dark-toggle.json';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  variant?: 'fixed' | 'inline';
}

export function ThemeToggle({ variant = 'fixed' }: ThemeToggleProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const lottieRef = useRef<any>(null);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set animation to appropriate static frame based on theme
  useEffect(() => {
    if (!mounted || !lottieRef.current) return;

    if (currentTheme === 'dark') {
      // Moon frame (dark mode)
      lottieRef.current.goToAndStop(100, true);
    } else {
      // Sun frame (light mode)
      lottieRef.current.goToAndStop(20, true);
    }
  }, [currentTheme, mounted]);

  const handleHoverStart = () => {
    if (isAnimating) return;
    setIsHovering(true);

    // Play a small preview animation on hover
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.8);
      const startFrame = currentTheme === 'dark' ? 100 : 20;
      const endFrame = currentTheme === 'dark' ? 85 : 35;
      
      // Slight animation preview (wiggle effect)
      if (currentTheme === 'dark') {
        lottieRef.current.playSegments([100, 90], true);
      } else {
        lottieRef.current.playSegments([20, 30], true);
      }
    }
  };

  const handleHoverEnd = () => {
    setIsHovering(false);

    // Return to static frame
    if (lottieRef.current) {
      setTimeout(() => {
        if (currentTheme === 'dark') {
          lottieRef.current.goToAndStop(100, true);
        } else {
          lottieRef.current.goToAndStop(20, true);
        }
      }, 300);
    }
  };

  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Play full transition animation
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.8);

      if (newTheme === 'dark') {
        // Animate Sun → Moon (frames 20 to 100)
        lottieRef.current.playSegments([20, 100], true);
      } else {
        // Animate Moon → Sun (frames 100 to 20)
        lottieRef.current.playSegments([100, 20], true);
      }
    }

    // Change theme mid-animation for seamless experience
    setTimeout(() => {
      setTheme(newTheme);
    }, 400);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
      setIsHovering(false);
    }, 900);
  };

  if (!mounted) {
    return null;
  }

  // Fixed overlay mode (original behavior)
  if (variant === 'fixed') {
    return (
      <div className="fixed top-5 left-5 z-[9999]">
        <button
          onClick={handleClick}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          disabled={isAnimating}
          className="relative w-20 h-20 flex items-center justify-center cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-full disabled:cursor-not-allowed"
          title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="sr-only">Toggle theme</span>

          {/* Lottie Animation - No container, direct rendering */}
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={false}
            className="w-full h-full"
            style={{
              width: '100%',
              height: '100%',
            }}
          />

          {/* Subtle hover hint glow (very subtle) */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-full bg-purple-400/30 blur-lg pointer-events-none"
            />
          )}
        </button>
      </div>
    );
  }

  // Inline mode (for use in navigation bars)
  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      disabled={isAnimating}
      className="relative w-16 h-16 flex items-center justify-center cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-lg disabled:cursor-not-allowed hover:bg-secondary/50"
      title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Lottie Animation for inline - fills container with scale boost */}
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        className="w-14 h-14 scale-125"
        style={{
          width: '56px',
          height: '56px',
        }}
      />

      {/* Subtle hover hint glow */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1.4 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 rounded-lg bg-purple-400/30 blur-lg pointer-events-none"
        />
      )}
    </button>
  );
}
