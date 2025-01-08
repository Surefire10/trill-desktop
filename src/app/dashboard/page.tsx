import { Fretboard } from "./sections/fretboard";
import { ChordLookup } from "./sections/lookup";

export default function Page() {
  return (
    <section className="indent py-40 w-full h-full ">
      <Fretboard />
      <ChordLookup />
    </section>
  );
}
