export function generateFretboardStrings(
  fretboardObject: {
    [key: number]: number[][];
  },
  mutedString: number[]
) {
  //   console.log(mutedString);
  const entriesArray = Object.entries(fretboardObject).filter(
    ([key, array]) => array.length !== 0
  );

  //remember frets also have muted strings with them
  let frets = "";
  let fingers = "";
  for (const fret of entriesArray) {
    const fretArrays = fret[1];
    frets += fret[0];
    for (const array of fretArrays) {
      fingers += array[0];
    }
  }
  let mutedLength = mutedString.length;
  while (fingers.length < 6) {
    fingers = fingers.concat("0");
  }
  while (frets.length < 6 && mutedLength > 0) {
    frets = frets.concat("x");
    mutedLength--;
  }

  fingers = fingers.split("").sort().join("");
  frets = frets.split("").sort().join("");
  return {
    fingers,
    frets,
  };
}
