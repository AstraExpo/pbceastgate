import { MapPin, Phone, Mail, Church } from "lucide-react";
import { Skeleton } from "@eastgate/ui/components/skeleton";
import {
  TypographyH4,
  TypographySmall,
  TypographyMuted,
} from "@eastgate/ui/components/typography";
import { FooterPayload } from "./mock.data";

interface FooterProps {
  isLoading: boolean;
  data?: FooterPayload;
}

export function Footer({ isLoading, data }: FooterProps) {
  return (
    <footer className="w-full bg-background border-t border-border text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* COLUMN 1: OUR SERVICES */}
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <TypographyH4 className="text-left">Our Services</TypographyH4>
            )}

            <div className="space-y-3">
              {isLoading ? (
                <>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-5/6" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3.5 w-1/2" />
                  </div>
                </>
              ) : (
                data?.services.map((service, index) => (
                  <div key={index} className="space-y-0.5">
                    <TypographySmall className="text-foreground block">
                      {service.title}
                    </TypographySmall>
                    {service.slots.map((slot, slotIndex) => (
                      <TypographyMuted key={slotIndex} className="block">
                        {slot}
                      </TypographyMuted>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: PBC INFORMATION */}
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-36" />
            ) : (
              <TypographyH4 className="text-left">PBC Information</TypographyH4>
            )}

            <address className="not-italic space-y-2.5">
              {isLoading ? (
                <>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-3.5 w-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-3.5 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-3.5 w-48" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                    <TypographyMuted>
                      {data?.information.address}
                    </TypographyMuted>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <a
                      href={`tel:${data?.information.phone.replace(/\s+/g, "")}`}
                      className="hover:text-foreground transition-colors"
                    >
                      <TypographyMuted>
                        {data?.information.phone}
                      </TypographyMuted>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <a
                      href={`mailto:${data?.information.email}`}
                      className="hover:text-foreground transition-colors"
                    >
                      <TypographyMuted>
                        {data?.information.email}
                      </TypographyMuted>
                    </a>
                  </div>
                </>
              )}
            </address>
          </div>

          {/* COLUMN 3: OTHER CAMPUSES */}
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-44" />
            ) : (
              <TypographyH4 className="text-left">
                Other PBC Campuses
              </TypographyH4>
            )}

            <ul className="space-y-2">
              {isLoading ? (
                <>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-3.5 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-3.5 w-32" />
                  </div>
                </>
              ) : (
                data?.campuses.map((campus, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Church className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <TypographyMuted>{campus}</TypographyMuted>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT SECTION */}
        <div className="mt-12 border-t border-border pt-6 text-center">
          {isLoading ? (
            <Skeleton className="h-3.5 w-64 mx-auto" />
          ) : (
            <TypographyMuted>
              &copy; {new Date().getFullYear()} Parklands Baptist Church. All
              rights reserved.
            </TypographyMuted>
          )}
        </div>
      </div>
    </footer>
  );
}
