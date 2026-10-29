import NewsUpdates from '@/components/news/news';

export const metadata = {
  title: 'News | Valorant Tournament',
  description: 'Get the latest updates and news about the Valorant tournament.',
};

export default function NewsPage() {
  return (
    <main>
      <NewsUpdates />
    </main>
  );
}