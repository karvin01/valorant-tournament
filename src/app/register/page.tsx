import RegisterSection from '@/components/register/RegisterSection';

export const metadata = {
  title: 'Register | Valorant Tournament',
  description: 'Create an account and register your team for the tournament.',
};

export default function RegisterPage() {
  return (
    <main className="w-full flex flex-col">
      <RegisterSection />
    </main>
  );
}
