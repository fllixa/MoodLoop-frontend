'use client';

import { useState, useCallback } from 'react';
import { Eye, EyeOff, Check, X, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  checkPasswordStrength,
  generateStrongPassword,
  type PasswordStrength,
} from '@/lib/password-strength';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  showStrengthFeedback?: boolean;
  language?: 'en' | 'ar';
}

export function PasswordInput({
  value,
  onChange,
  label = 'Password',
  placeholder = 'Enter your password',
  error,
  showStrengthFeedback = true,
  language = 'en',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [copied, setCopied] = useState(false);

  const passwordStrength = checkPasswordStrength(value);

  const getStrengthColor = (level: PasswordStrength['level']) => {
    const colors = {
      weak: 'text-red-500 bg-red-500/10 border-red-500/30',
      fair: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
      good: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
      strong: 'text-green-500 bg-green-500/10 border-green-500/30',
      'very-strong': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    };
    return colors[level];
  };

  const getStrengthLabel = (level: PasswordStrength['level']) => {
    const labels = {
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      'very-strong': 'Very Strong',
    };
    return labels[level];
  };

  const handleSuggestPassword = () => {
    const newPassword = generateStrongPassword(16);
    onChange(newPassword);
    setShowPassword(true);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 w-full">
      {label && (
        <Label htmlFor="password" className="text-foreground font-medium">
          {label}
        </Label>
      )}

      {/* Password Input Field */}
      <div className="relative">
        <div className="relative flex items-center">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setShowStrength(true);
            }}
            onFocus={() => setShowStrength(true)}
            onBlur={() => setTimeout(() => setShowStrength(false), 200)}
            className={`${
              error
                ? 'border-red-500 focus-visible:ring-red-500'
                : 'border-border focus-visible:ring-primary'
            } pr-20`}
          />

          {/* Show/Hide Password Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Eye className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>

      {/* Suggest Strong Password Button */}
      {showStrengthFeedback && !passwordStrength.isValid && (
        <motion.button
          type="button"
          onClick={handleSuggestPassword}
          className="w-full py-2 px-3 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-sm text-primary font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wand2 className="w-4 h-4" />
          Suggest Strong Password
        </motion.button>
      )}

      {/* Password Strength Feedback */}
      <AnimatePresence>
        {showStrengthFeedback && value && showStrength && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Strength Indicator Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Strength
                </span>
                <span className={`text-sm font-semibold ${getStrengthColor(passwordStrength.level).split(' ')[0]}`}>
                  {getStrengthLabel(passwordStrength.level)}
                </span>
              </div>

              {/* Strength Bar */}
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    passwordStrength.level === 'weak'
                      ? 'bg-red-500'
                      : passwordStrength.level === 'fair'
                        ? 'bg-yellow-500'
                        : passwordStrength.level === 'good'
                          ? 'bg-blue-500'
                          : passwordStrength.level === 'strong'
                            ? 'bg-green-500'
                            : 'bg-emerald-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-2 p-3 bg-card/50 rounded-lg border border-border">
              <p className="text-xs font-medium text-muted-foreground">
                Password Requirements:
              </p>

              <div className="space-y-1.5">
                {/* Min Length */}
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{
                    opacity: passwordStrength.checks.minLength ? 1 : 0.5,
                  }}
                >
                  {passwordStrength.checks.minLength ? (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      passwordStrength.checks.minLength
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }
                  >
                    At least 8 characters
                  </span>
                </motion.div>

                {/* Uppercase */}
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{
                    opacity: passwordStrength.checks.hasUppercase ? 1 : 0.5,
                  }}
                >
                  {passwordStrength.checks.hasUppercase ? (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      passwordStrength.checks.hasUppercase
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }
                  >
                    One uppercase letter (A-Z)
                  </span>
                </motion.div>

                {/* Lowercase */}
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{
                    opacity: passwordStrength.checks.hasLowercase ? 1 : 0.5,
                  }}
                >
                  {passwordStrength.checks.hasLowercase ? (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      passwordStrength.checks.hasLowercase
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }
                  >
                    One lowercase letter (a-z)
                  </span>
                </motion.div>

                {/* Number */}
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{
                    opacity: passwordStrength.checks.hasNumber ? 1 : 0.5,
                  }}
                >
                  {passwordStrength.checks.hasNumber ? (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      passwordStrength.checks.hasNumber
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }
                  >
                    One number (0-9)
                  </span>
                </motion.div>

                {/* Special Character */}
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{
                    opacity: passwordStrength.checks.hasSpecialChar ? 1 : 0.5,
                  }}
                >
                  {passwordStrength.checks.hasSpecialChar ? (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      passwordStrength.checks.hasSpecialChar
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }
                  >
                    One special character (@, #, $, etc.)
                  </span>
                </motion.div>
              </div>

              {/* Feedback Message */}
              <p className="text-xs text-muted-foreground mt-2 italic">
                {passwordStrength.feedback}
              </p>

              {/* Copy Generated Password Button */}
              {value && (
                <motion.button
                  type="button"
                  onClick={handleCopyPassword}
                  className="w-full mt-2 py-1.5 px-2 rounded text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? '✓ Copied!' : 'Copy Password'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
