import LoginSection from '@/components/login/login';

export const metadata = {
  title: 'Login | Valorant Tournament',
  description: 'Log in to manage your squad and view tournament brackets.',
};

export default function LoginPage() {
  return (
    <main className="w-full flex flex-col">
      <LoginSection />
    </main>
  );
}