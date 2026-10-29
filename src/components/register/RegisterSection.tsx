'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { checkUserTeamExists } from '@/lib/authService';
import RegisterForm from './registerForm';
import CompleteRosterForm from './rosterForm';

export default function RegisterSection() {
  const router = useRouter();

  // --- MULTI-STEP FLOW STATE ---
  // Tracks current registration step: 'loading' during session check, 'register' for credentials, 'roster' for squad details
  const [step, setStep] = useState<'register' | 'roster' | 'loading'>('loading');

  // --- AUTH & ROSTER CHECK ---
  // On mount, inspects active session to route existing users or advance partially registered users to the roster form
  useEffect(() => {
    async function checkAuthAndRoster() {
      try {
        // Query Appwrite for an active session account
        const user = await account.get();
        if (!user || !user.$id) {
          // No active session found; present initial account creation form
          setStep('register');
          return;
        }

        // Verify if logged-in user already has an associated team in the database
        const hasTeam = await checkUserTeamExists(user.$id);
        if (hasTeam) {
          // If team already exists, registration is already complete; route to home
          router.push('/');
        } else {
          // User has an account but hasn't completed their team roster yet
          setStep('roster');
        }
      } catch {
        // Not authenticated / session expired; fallback to registration step
        setStep('register');
      }
    }
    checkAuthAndRoster();
  }, [router]);

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24 flex items-center justify-center">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        {/* Main Card Container */}
        <div className="w-full max-w-2xl bg-brand-light p-8 sm:p-10 rounded-none shadow-2xl border-t-4 border-brand-red">
          {/* Step 0: Verification / Loading Placeholder */}
          {step === 'loading' && <div className="text-center py-12 font-bebas text-xl text-brand-dark tracking-wider">LOADING...</div>}
          
          {/* Step 1: Account Credentials (switches to roster step upon successful user creation) */}
          {step === 'register' && <RegisterForm onSuccess={() => setStep('roster')} />}
          
          {/* Step 2: Roster Submission */}
          {step === 'roster' && <CompleteRosterForm />}
        </div>
      </div>
    </div>
  );
}