"use client";

import { Fret } from "@/components/ui/fret";
import { useState } from "react";
import type { Fretboard } from "@/types/fretboard";

export function Fretboard() {
  const [fretboardObject, setFretboardObject] = useState<Fretboard>({});
  console.log(fretboardObject);
  let width = 145;
  const fretMarkers = [3, 5, 7, 9, 15, 17, 19, 23];
  return (
    <section className="indent w-full h-full flex items-center justify-center ">
      <div className="flex flex-col gap-2 items-start w-full">
        <div>
          <h1>Fretboard</h1>
        </div>
        <div className="flex flex-row-reverse rounded-md w-full border border-gray-500">
          {new Array(24).fill(7).map((item, index) => {
            if (width > 0) width -= 5;
            return (
              <Fret
                key={width}
                fretNumber={index + 1}
                style={{ width: `${width}px` }}
                setFretboardObject={setFretboardObject}
                fretboardObject={fretboardObject}
                marker={fretMarkers.includes(index + 1)}
                doubleMarker={index + 1 === 12}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
