import Chord from "@techies23/react-chords";
const instrument = {
  strings: 6,
  fretsOnChord: 4,
  name: "Guitar",
  keys: [],
  tunings: {
    standard: ["E", "A", "D", "G", "B", "E"],
  },
};

export function ChordLookup() {
  return (
    <div>
      <Chord
        chord={{
          frets: [1, 3, 3, 2, 1, 1],
          fingers: [1, 3, 4, 2, 1, 1],
        }}
        instrument={instrument}
      />
    </div>
  );
}
