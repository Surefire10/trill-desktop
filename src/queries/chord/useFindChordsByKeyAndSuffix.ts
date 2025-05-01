import { useQuery } from "@tanstack/react-query";

export const useFindChordsByKeyAndSuffix = (key: string, suffix: string) => {
  return useQuery<any, any>({
    queryKey: [key, suffix],
    queryFn: async () => {
      const cleanKey = key.replace("#", "sharp");
      const cleanSuffix = suffix === "all" ? "" : suffix.replace("#", "sharp");

      const params = new URLSearchParams({
        key: cleanKey,
        suffix: cleanSuffix,
      });

      const response = await fetch(`/api/chord/find-by-key-suffix?${params}`);
      return response.json();
    },
    enabled: !!(key && suffix),
  });
};
