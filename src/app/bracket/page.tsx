import Brackets from '@/components/bracket/bracket';

export const metadata = {
  title: 'Tournament Bracket | Valorant Tournament',
  description: 'View the official tournament bracket and live match standings.',
};

export default function BracketPage() {
  return (
    <main>
      <Brackets/>
    </main>
  );
}