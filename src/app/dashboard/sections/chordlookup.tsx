import { ChordLookupHeader } from "@/components/ui/chordlookupheader";

interface ChordLookupProps {
  searchData: {
    keys: string[];
    suffixes: string[];
  };
}

export function ChordLookup({ searchData }: ChordLookupProps) {
  return (
    <section className="indent w-full h-full flex flex-col justify-center gap-10">
      <div>
        <h1 className="text-3xl font-semibold">Chord Lookup</h1>
        <p>Search chords by key.</p>
      </div>
    </section>
  );
}
