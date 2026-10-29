'use client';
import React, { useState } from 'react';
import { registerUser } from '@/lib/authService';

interface RegisterFormProps {
  // Callback fired once Appwrite account and initial session are created
  onSuccess: (userId: string) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  // --- FORM FIELD STATE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- SUBMISSION & VALIDATION STATE ---
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- VALIDATION PATTERNS ---
  // Password policy: min 8 characters, at least 1 lowercase, 1 uppercase, 1 digit, and 1 special symbol
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  // Display name policy: 2 to 30 characters consisting of letters, digits, spaces, underscores, or hyphens
  const nameRegex = /^[a-zA-Z0-9 _\-]{2,30}$/;

  // --- REGISTRATION SUBMIT HANDLER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side display name validation
    if (!nameRegex.test(name.trim())) {
      setError('Display name must be between 2 and 30 characters and contain only letters, numbers, spaces, underscores, or hyphens.');
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    // Complexity verification
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
      return;
    }

    setLoading(true);

    try {
      // Invoke Appwrite auth service to register user and instantiate active session
      const userId = await registerUser(email, password, name);
      // Advance to Step 2 (Roster setup)
      onSuccess(userId);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">CREATE ACCOUNT</h1>
      <p className="font-inter text-sm text-gray-600 text-center mb-8">Sign up to register your squad for the tournament.</p>

      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        {/* Dynamic Error Banner */}
        {error && <div className="bg-brand-red/10 border border-brand-red text-brand-red p-3 font-inter text-sm">{error}</div>}

        {/* Display Name Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-name" className="font-bebas tracking-wider text-brand-dark text-sm">Display Name</label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={30}
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
            placeholder="e.g. TenzFan99" />
        </div>

        {/* Email Address Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-email" className="font-bebas tracking-wider text-brand-dark text-sm">Email Address</label>
          <input
            id="reg-email"
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
            placeholder="name@example.com" />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-password" className="font-bebas tracking-wider text-brand-dark text-sm">Password</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
            placeholder="At least 8 characters" />
          <span className="text-[11px] text-gray-500 font-inter">Must be 8+ chars with 1 uppercase letter, 1 number, and 1 special character.</span>
        </div>

        {/* Password Confirmation */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-confirm" className="font-bebas tracking-wider text-brand-dark text-sm">Confirm Password</label>
          <input
            id="reg-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-brand-red"
            placeholder="Re-enter password" />
        </div>

        {/* Form Submission Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="mt-4 bg-brand-red hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
        >
          {loading ? 'CREATING ACCOUNT...' : 'NEXT: TEAM ROSTER'}
        </button>
      </form>
    </div>
  );
}