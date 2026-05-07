/**
 * Password strength validation utility
 */

export interface PasswordStrengthChecks {
  minLength: boolean; // At least 8 characters
  hasUppercase: boolean; // At least one uppercase letter
  hasLowercase: boolean; // At least one lowercase letter
  hasNumber: boolean; // At least one number
  hasSpecialChar: boolean; // At least one special character
}

export interface PasswordStrength {
  score: number; // 0-5
  level: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  checks: PasswordStrengthChecks;
  isValid: boolean;
  feedback: string;
}

/**
 * Check password against all requirements
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const checks: PasswordStrengthChecks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  // Calculate score
  let score = 0;
  if (checks.minLength) score++;
  if (checks.hasUppercase) score++;
  if (checks.hasLowercase) score++;
  if (checks.hasNumber) score++;
  if (checks.hasSpecialChar) score++;

  // Determine level
  let level: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  let feedback: string;

  if (score === 0) {
    level = 'weak';
    feedback = 'Password is too weak. Add more variety.';
  } else if (score === 1 || score === 2) {
    level = 'weak';
    feedback = 'Password is weak. Add uppercase, numbers, and special characters.';
  } else if (score === 3) {
    level = 'fair';
    feedback = 'Password is fair. Consider adding more variety.';
  } else if (score === 4) {
    level = 'good';
    feedback = 'Good password! Add a special character for better security.';
  } else {
    level = 'very-strong';
    feedback = 'Excellent! Your password is very strong.';
  }

  const isValid = Object.values(checks).every((check) => check === true);

  return {
    score,
    level,
    checks,
    isValid,
    feedback,
  };
}

/**
 * Generate a strong random password
 */
export function generateStrongPassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '@#$%^&*()_+-=[]{};\':"|,.<>/?';

  // Ensure all character types are included
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill rest with random chars
  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
