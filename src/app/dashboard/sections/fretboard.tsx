"use client";

import { Fret } from "@/components/ui/fret";
import { useEffect, useRef, useState } from "react";
import type { Fretboard } from "@/types/fretboard";
import { X } from "lucide-react";
import { useFindChord } from "@/queries/chord/useFindChord";
import { generateFretboardStrings } from "@/helper/generateFretboardStrings";
import { Skeleton } from "@/components/ui/skeleton";
import { ChordType } from "ChordModule";
import { Guitar } from "@/lib/instrument";
import Chord from "@/components/ui/chord";
import { useDebounce } from "@uidotdev/usehooks";
import { ButtonRight } from "@/components/ui/icons/button-right";
import { ButtonLeft } from "@/components/ui/icons/button-left";

export function Fretboard() {
  const [fretboardObject, setFretBoardObject] = useState<{
    [key: string]: number[][];
  }>({});

  const [mutedStrings, setMutedStrings] = useState<number[]>([]);
  const [fetchData, setFetchData] = useState<{
    fingers: string;
    frets: string;
  }>();

  const chordsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = generateFretboardStrings(fretboardObject, mutedStrings);
    console.log(data);
    setFetchData(data);
  }, [fretboardObject, mutedStrings]);

  const debouncedData = useDebounce(fetchData, 1500);
  const fingers = debouncedData?.fingers ?? "";
  const frets = debouncedData?.frets ?? "";
  const chord = useFindChord(fingers, frets);

  function updateObject(
    id: number,
    fretboardArrayMap: Map<number, number[][]>
  ) {
    const values = fretboardArrayMap.get(id) ?? [];
    setFretBoardObject((prevArray) => ({
      ...prevArray,
      [id]: values,
    }));
  }

  function muteHandler(stringNumber: number) {
    let array = [...mutedStrings];
    if (array.includes(stringNumber)) {
      array = array.filter((string) => string !== stringNumber);
    } else {
      array.push(stringNumber);
    }
    setMutedStrings(array);
  }

  function scrollHandler(value: number) {
    chordsContainer.current?.scrollBy({
      left: `${value}`,
      top: 0,
      behavior: "smooth",
    });
  }

  let width = 205;
  const fretMarkers = [3, 5, 7, 9, 15, 17, 19, 23];
  return (
    <section className="indent w-full mt-12 flex flex-col justify-center gap-10 h-[800px]">
      <div>
        <h2 className="text-4xl font-semibold">Fretboard</h2>
        <p>
          Put down the notes of a chord to find out its name. Or search by key.
        </p>
      </div>
      {/* Fretboard */}
      <div className="flex items-center justify-center ml-3">
        <div className="flex flex-row-reverse rounded-md w-full border border-gray-500">
          {new Array(18).fill(7).map((item, index) => {
            if (width > 0) width -= 5;
            return (
              <Fret
                key={width}
                fretNumber={index + 1}
                style={{ width: `${width}px` }}
                marker={fretMarkers.includes(index + 1)}
                doubleMarker={index + 1 === 12}
                updateFunction={updateObject}
                mutedStrings={mutedStrings}
              />
            );
          })}
        </div>
        <div className="flex flex-col-reverse">
          {new Array(6).fill(9).map((item, index) => {
            return (
              <X
                key={item + index}
                onClick={() => {
                  muteHandler(index + 1);
                }}
                className="hover:cursor-pointer"
                style={{
                  stroke: mutedStrings.includes(index + 1)
                    ? "#8c120c"
                    : "white",
                }}
              />
            );
          })}
        </div>
      </div>

      {chord.isLoading && (
        <div className="flex gap-5 h-48">
          <Skeleton className="w-[270px] h-full"></Skeleton>
          <Skeleton className="w-[270px] h-full"></Skeleton>
          <Skeleton className="w-[270px] h-full"></Skeleton>
          <Skeleton className="w-[270px] h-full"></Skeleton>
          <Skeleton className="w-[270px] h-full"></Skeleton>
        </div>
      )}

      <div
        ref={chordsContainer}
        className="w-full flex gap-2 overflow-x-scroll no-scrollbar"
      >
        {chord.data &&
          chord.data.map((chord: ChordType) => {
            return (
              <div
                key={chord.id}
                className="flex  flex-col items-center min-w-[250px]"
              >
                <Chord key={chord.id} chord={chord} instrument={Guitar} />
                <div>
                  <span>{chord.key}</span> <span>{chord.suffix}</span>
                </div>
              </div>
            );
          })}
      </div>
      {chord.data && chord.data.length > 0 && (
        <div className="w-full flex justify-end items-center  gap-2">
          <ButtonLeft
            onClick={() => {
              scrollHandler(-400);
            }}
            width={40}
          />
          <ButtonRight
            onClick={() => {
              scrollHandler(400);
            }}
            width={40}
          />
        </div>
      )}
    </section>
  );
}
