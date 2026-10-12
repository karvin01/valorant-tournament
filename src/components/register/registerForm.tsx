'use client';
import React, { useState } from 'react';
import { account, ID } from '@/lib/appwrite';

interface RegisterFormProps {
  onSuccess: (userId: string) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Regex rule: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Check if passwords match first
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    // 2. Validate password complexity
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
      return;
    }

    setLoading(true);

    try {
      const newAccount = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      onSuccess(newAccount.$id);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">
        CREATE ACCOUNT
      </h1>
      <p className="font-inter text-sm text-gray-600 text-center mb-8">
        Sign up to register your squad for the tournament.
      </p>

      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        {error && (
          <div className="bg-[#ff4655]/10 border border-[#ff4655] text-[#ff4655] p-3 font-inter text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-bebas tracking-wider text-brand-dark text-sm">Display Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]"
            placeholder="e.g. TenzFan99"
          />
        </div>

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
            placeholder="At least 8 characters"
          />
          <span className="text-[11px] text-gray-500 font-inter">
            Must be 8+ chars with 1 uppercase letter, 1 number, and 1 special character.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bebas tracking-wider text-brand-dark text-sm">Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]"
            placeholder="Re-enter password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 bg-[#ff4655] hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
        >
          {loading ? 'CREATING ACCOUNT...' : 'NEXT: TEAM ROSTER'}
        </button>
      </form>
    </div>
  );
}