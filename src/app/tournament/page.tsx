import TournamentHero from '@/components/tournament/TournamentHero';
import TournamentSchedule from '@/components/tournament/TournamentSchedule';
import MapPool from '@/components/tournament/Mappool';
import Requirements from '@/components/tournament/Requirements';


export default function TournamentPage() {
  return (
    <main>
      <TournamentHero />
      <TournamentSchedule />
      <MapPool />
      <Requirements />
    </main>
  );
}