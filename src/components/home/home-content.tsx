import { ArtCard } from "./cards/art-card";
import { CalendarCard } from "./cards/calendar-card";
import { ClockCard } from "./cards/clock-card";
import { HiCard } from "./cards/hi-card";
import { MusicCard } from "./cards/music-card";
import { NavCard } from "./cards/nav-card";
import { ProjectCard } from "./cards/project-card";
import { SocialCard } from "./cards/social-card";

// Source order is the mobile reading order; CSS grid areas place cards on wider screens.
export function HomeContent() {
  return (
    <div className="bento">
      <HiCard />
      <NavCard />
      <ProjectCard />
      <MusicCard />
      <ArtCard />
      <ClockCard />
      <CalendarCard />
      <SocialCard />
    </div>
  );
}
