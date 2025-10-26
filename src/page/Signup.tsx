import { useState, type FormEvent } from 'react';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/Layout';

type SignupProps = {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
};

export function Signup({ onNavigate, onShowToast }: SignupProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await signUp(email, password);

    if (error) {
      onShowToast(error.message || 'Failed to create account. Please try again.', 'error');
      setIsSubmitting(false);
    } else {
      onShowToast('Account created successfully! You are now logged in.', 'success');
      onNavigate('dashboard');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600">Start managing your tickets today</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="••••••••"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                  />
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-blue-600 font-semibold hover:text-blue-700 focus:outline-none focus:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm text-slate-600 hover:text-slate-900 focus:outline-none focus:underline"
            >
              &larr; Back to home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
