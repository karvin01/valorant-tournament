import TeamsSection from '@/components/teams/TeamsSection';

export const metadata = {
  title: 'Teams | Valorant Tournament',
  description: 'View and manage your tournament teams.',
};

export default function TeamsPage() {
  return (
    <main className="w-full flex flex-col">
      <TeamsSection />
    </main>
  );
}