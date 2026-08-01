import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@eastgate/ui/components/carousel";
import { Button } from "@eastgate/ui/components/button";
import {
  TypographyH3,
  TypographyP,
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from "@eastgate/ui/components/typography";
import { mockHeroData } from "../layout/mock.data";

export function Hero() {
  const slides = mockHeroData.slides;
  const announcement = mockHeroData.announcement;

  return (
    <section className="w-full border-b border-border bg-background py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CAROUSEL WRAPPER (Sizing removed from here) */}
        <div className="lg:col-span-2 w-full">
          <Carousel opts={{ loop: true }} className="w-full group">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem
                  key={index}
                  // Aspect ratio applied directly to the slide to dictate carousel height naturally
                  className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-10 pr-16">
                    <TypographyH3 className="text-left text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-white">
                      {slide.heading}
                    </TypographyH3>
                    <TypographyP className="mt-2 text-xs sm:text-sm md:text-base text-gray-200 [p&:not(:first-child)]:mt-2 font-normal">
                      {slide.description}
                    </TypographyP>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background border-border text-foreground" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background border-border text-foreground" />
          </Carousel>
        </div>

        {/* UPCOMING EVENTS / SIDEBAR */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 sm:p-6 text-card-foreground min-h-75 lg:min-h-full">
          <div>
            <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs text-destructive font-medium tracking-wide uppercase">
              <TypographySmall className="font-medium tracking-wide">
                Notice / Event
              </TypographySmall>
            </span>

            {announcement && (
              <div className="mt-4 space-y-2">
                <TypographyLarge className="text-base sm:text-lg tracking-tight font-semibold text-foreground">
                  {announcement.title}
                </TypographyLarge>
                {announcement.eventDate && (
                  <TypographyMuted className="text-xs sm:text-sm text-muted-foreground font-normal">
                    Scheduled: {announcement.eventDate}
                  </TypographyMuted>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm font-medium"
            >
              View All Bulletins
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
