'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'ar';
}

const translations = {
  en: {
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    enterEmail: 'Enter your email address and we\'ll send you a link to reset your password.',
    email: 'Email Address',
    emailPlaceholder: 'your.email@company.com',
    sendReset: 'Send Reset Link',
    back: 'Back to Login',
    emailRequired: 'Please enter your email address',
    invalidEmail: 'Please enter a valid email address',
    success: 'Success!',
    checkEmail: 'Check your email for password reset instructions. The link will expire in 24 hours.',
    sendAnother: 'Send Another Email',
    backToLogin: 'Back to Login',
  },
  ar: {
    forgotPassword: 'هل نسيت كلمة المرور؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    enterEmail: 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.',
    email: 'عنوان البريد الإلكتروني',
    emailPlaceholder: 'your.email@company.com',
    sendReset: 'إرسال رابط إعادة التعيين',
    back: 'العودة إلى تسجيل الدخول',
    emailRequired: 'يرجى إدخال عنوان بريدك الإلكتروني',
    invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    success: 'نجح!',
    checkEmail: 'تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور. سينتهي صلاحية الرابط خلال 24 ساعة.',
    sendAnother: 'إرسال بريد آخر',
    backToLogin: 'العودة إلى تسجيل الدخول',
  },
};

export function ForgotPasswordModal({
  isOpen,
  onClose,
  language = 'en',
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations[language];

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto-close after 5 seconds
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  const handleSendAnother = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-border bg-card/90 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  {t.resetPassword}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {t.enterEmail}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-foreground">
                    {t.email}
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    disabled={isSubmitting}
                    className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t.back}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? 'Sending...' : t.sendReset}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-4 py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-green-500" />
              </motion.div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t.success}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.checkEmail}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendAnother}
                  className="flex-1"
                >
                  {t.sendAnother}
                </Button>
                <Button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {t.backToLogin}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Auto-closing...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
