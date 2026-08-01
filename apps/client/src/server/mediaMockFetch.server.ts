import { createServerFn } from "@tanstack/react-start";

export interface MediaPayload {
  imageUrl: string;
  title: string;
  description: string;
}

export const fetchSermonMediaData = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediaPayload> => {
    // Artificial delay to force skeleton state visualization
    await new Promise(resolve => setTimeout(resolve, 2500));

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/12",
    );

    if (!response.ok) {
      throw new Error("Network execution layer failed to fetch payload data");
    }

    const json = await response.json();

    return {
      // Utilizing a stable, cache-busted production image asset
      imageUrl:
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&q=80",
      title: json.title,
      description: json.body,
    };
  },
);
