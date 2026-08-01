import { AspectRatio } from "@eastgate/ui/components/aspect-ratio";
import { Skeleton } from "@eastgate/ui/components/skeleton";
import { Button } from "@eastgate/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@eastgate/ui/components/card";

export interface MediaCardProps {
  isLoading: boolean;
  data?: {
    imageUrl: string;
    title: string;
    description: string;
  };
}

export function MediaCard({ isLoading, data }: MediaCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden bg-card border-border">
      {/* MEDIA CONTAINER */}
      <CardContent className="p-4 pb-0">
        <div className="overflow-hidden rounded-lg border border-border bg-muted">
          <AspectRatio ratio={16 / 9}>
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-none" />
            ) : (
              <img
                src={data?.imageUrl}
                alt=""
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            )}
          </AspectRatio>
        </div>
      </CardContent>

      {/* METADATA BLOCK */}
      <CardHeader className="p-4 space-y-1.5">
        {isLoading ? (
          <>
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </>
        ) : (
          <>
            <CardTitle className="text-left text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-1">
              {data?.title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-2 leading-relaxed">
              {data?.description}
            </CardDescription>
          </>
        )}
      </CardHeader>

      {/* ACTION FOOTER */}
      <CardFooter className="p-4 pt-0">
        {isLoading ? (
          <Skeleton className="h-9 w-full rounded-md" />
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs sm:text-sm font-medium"
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
