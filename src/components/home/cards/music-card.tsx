import { Card } from "./card";

// The player itself lives in the root layout (see PersistentPlayer) so it keeps
// playing across pages; this card only reserves its place on the home grid.
export function MusicCard() {
  return (
    <Card area="music" order={8}>
      <div className="music-facade">
        <span className="music-note" aria-hidden="true">
          ♪
        </span>
        <div className="player-slot" data-player-slot />
      </div>
    </Card>
  );
}
