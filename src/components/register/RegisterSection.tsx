'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { checkUserTeamExists } from '@/lib/authService';
import RegisterForm from './registerForm';
import CompleteRosterForm from './rosterForm';

export default function RegisterSection() {
  const router = useRouter();
  const [step, setStep] = useState<'register' | 'roster' | 'loading'>('loading');

  useEffect(() => {
    async function checkAuthAndRoster() {
      try {
        const user = await account.get();
        if (!user || !user.$id) {
          setStep('register');
          return;
        }

        const hasTeam = await checkUserTeamExists(user.$id);
        if (hasTeam) {
          router.push('/');
        } else {
          setStep('roster');
        }
      } catch {
        setStep('register');
      }
    }
    checkAuthAndRoster();
  }, [router]);

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24 flex items-center justify-center">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-brand-light p-8 sm:p-10 rounded-none shadow-2xl border-t-4 border-[brand-red]">
          {step === 'loading' && <div className="text-center py-12 font-bebas text-xl text-brand-dark tracking-wider">LOADING...</div>}
          {step === 'register' && <RegisterForm onSuccess={() => setStep('roster')} />}
          {step === 'roster' && <CompleteRosterForm />}
        </div>
      </div>
    </div>
  );
}