import { HeroProps } from "./sections/Hero";
import { Sections } from "./sections/Sections";

interface EastgateLandingProps {
  pageData: HeroProps;
}

export function EastgateLanding({ pageData }: EastgateLandingProps) {
  return (
    <div className="w-full bg-background animate-fade-in">
      <Sections pageConfigData={pageData} />
    </div>
  );
}
