import { useQuery } from "@tanstack/react-query";

export const useFindChord = (fingers: string, frets: string) => {
  return useQuery<any, any>({
    queryKey: ["chord", fingers, frets],
    queryFn: async () => {
      const params = new URLSearchParams({
        fingers: fingers,
        frets: frets,
      });

      console.log(params);
      const response = await fetch(
        `/api/chord/find-by-position?${params.toString()}`
      );
      return response.json();
    },
    enabled: !!(fingers.length && frets.length),
  });
};
