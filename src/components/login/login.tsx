'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account, databases, DB_ID, TEAMS_TABLE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

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
      // 0. If a session already exists, delete it first to avoid the collision error
      try {
        await account.deleteSession('current');
      } catch {
        // No active session found, which is fine—proceed to login
      }

      // 1. Create session (Login)
      await account.createEmailPasswordSession(email, password);

      // 2. Get the logged-in user details
      const user = await account.get();

      // 3. Check if this user has already submitted their team roster in TablesDB
      const response = await databases.listDocuments(
        DB_ID,
        TEAMS_TABLE_ID,
        [Query.equal('userId', user.$id)]
      );

      // Refresh layout router cache so Navbar updates immediately
      router.refresh();

      if (response.documents.length === 0) {
        setError('Account found, but team roster is missing. Please complete your registration.');
        router.push('/register'); 
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24 flex items-center justify-center">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        
        <div className="w-full max-w-2xl bg-brand-light p-8 sm:p-10 rounded-none shadow-2xl border-t-4 border-[#ff4655]">
          <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">
            LOGIN TO TOURNAMENT
          </h1>
          <p className="font-inter text-sm text-gray-600 text-center mb-8">
            Enter your credentials to access your squad dashboard.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-[#ff4655]/10 border border-[#ff4655] text-[#ff4655] p-3 font-inter text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-bebas tracking-wider text-brand-dark text-sm">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]"
                placeholder="name@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bebas tracking-wider text-brand-dark text-sm">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]"
                placeholder="********"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-[#ff4655] hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}