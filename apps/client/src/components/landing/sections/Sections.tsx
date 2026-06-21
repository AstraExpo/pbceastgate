import { Hero, HeroProps } from "./Hero";

interface SectionsProps {
  pageConfigData: HeroProps;
}

export function Sections({ pageConfigData }: SectionsProps) {

  return (
    <div className="w-full space-y-12 pb-16">
      <Hero slides={pageConfigData.slides} announcement={pageConfigData.announcement} />
    </div>
  );
}
