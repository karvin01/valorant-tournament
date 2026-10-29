import HomeHero from '@/components/home/HomeHero';
import HomeCards from '@/components/home/HomeCards';
import HomePrizepool from '@/components/home/HomePrizepool';

export const metadata = {
  title: 'Home | Valorant Tournament',
  description: 'Join the ultimate competitive Valorant esports tournament.',
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeCards />
      <HomePrizepool />
    </main>
  );
}
