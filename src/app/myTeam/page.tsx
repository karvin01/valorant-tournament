import MyTeamSection from '@/components/teams/MyTeamSection';

export const metadata = {
  title: 'My Team | Valorant Tournament',
  description: 'Manage your team and view player statistics.',
};

export default function MyTeamPage() {
  return (
    <main className="w-full flex flex-col">
      <MyTeamSection />
    </main>
  );
}