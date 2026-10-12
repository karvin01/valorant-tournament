'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account, databases, DB_ID, TEAMS_TABLE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import RegisterForm from './registerForm';
import CompleteRosterForm from './rosterForm';

export default function RegisterSection() {
  const router = useRouter();
  const [step, setStep] = useState<'register' | 'roster' | 'loading'>('loading');

  useEffect(() => {
    async function checkAuthAndRoster() {
      try {
        // 1. Check if an active session exists
        const user = await account.get();
        if (!user || !user.$id) {
          setStep('register');
          return;
        }

        // 2. Check if this logged-in user already submitted a team roster
        const response = await databases.listDocuments(
          DB_ID,
          TEAMS_TABLE_ID,
          [Query.equal('userID', user.$id)]
        );

        if (response.documents.length > 0) {
          // Already registered a team! Kick them back to home/dashboard
          router.push('/');
        } else {
          // Logged in, but missing a roster -> Show roster form
          setStep('roster');
        }
      } catch {
        // Not logged in (session expired or deleted) -> Show register form cleanly
        setStep('register');
      }
    }
    checkAuthAndRoster();
  }, [router]);

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24 flex items-center justify-center">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        
        <div className="w-full max-w-2xl bg-brand-light p-8 sm:p-10 rounded-none shadow-2xl border-t-4 border-[#ff4655]">
          
          {step === 'loading' && (
            <div className="text-center py-12 font-bebas text-xl text-brand-dark tracking-wider">
              LOADING...
            </div>
          )}

          {step === 'register' && (
            <RegisterForm onSuccess={() => setStep('roster')} />
          )}

          {step === 'roster' && (
            <CompleteRosterForm />
          )}

        </div>
      </div>
    </div>
  );
}