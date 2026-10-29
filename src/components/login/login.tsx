'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/authService';

export default function LoginSection() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { redirectPath } = await loginUser(email, password);
      router.refresh();
      router.push(redirectPath);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password.';
      setError(errorMessage);
      
      // If team roster was missing, redirect to register
      if (errorMessage.includes('team roster is missing')) {
        router.push('/register');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24 flex items-center justify-center">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        
        <div className="w-full max-w-2xl bg-brand-light p-8 sm:p-10 rounded-none shadow-2xl border-t-4 border-brand-red">
          <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">
            LOGIN TO TOURNAMENT
          </h1>
          <p className="font-inter text-sm text-gray-600 text-center mb-8">
            Enter your credentials to access your squad dashboard.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-brand-red/10 border border-brand-red text-brand-red p-3 font-inter text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="login-email" className="font-bebas tracking-wider text-brand-dark text-sm">Email Address</label>
              <input 
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
                placeholder="name@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="login-password" className="font-bebas tracking-wider text-brand-dark text-sm">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
                placeholder="********" />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-brand-red hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}