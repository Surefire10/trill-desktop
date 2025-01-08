"use client";

import { cn } from "@/lib/utils";
import { String } from "./string";
import { useEffect, useRef, useState } from "react";
import { Fretboard } from "@/types/fretboard";

interface FretProps {
  className?: string;
  fretNumber: number;
  marker?: boolean;
  doubleMarker?: boolean;
  setFretboardObject: (object: Fretboard) => void;
  fretboardObject: Fretboard;
  style: React.CSSProperties;
}

export function Fret({
  className,
  fretNumber,
  setFretboardObject,
  fretboardObject,
  marker,
  doubleMarker,
  style,
}: FretProps) {
  const [middlePoint, setMiddlePoint] = useState(10);
  const [activeStrings, setActiveStrings] = useState<number[]>([]);

  const ref = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const dot = ref.current.getBoundingClientRect().width / 2 - 7.4; //takeaway 7.5 cause it's roughly the radius of the dot;
    setMiddlePoint(dot);
    const debouncedObjectSetter = setTimeout(() => {
      if (activeStrings.length > 0) {
        setFretboardObject({ ...fretboardObject, [fretNumber]: activeStrings });
      } else {
        const filteredItems = Object.fromEntries(
          Object.entries(fretboardObject).filter(
            ([, activeStrings]) => activeStrings.length > 0
          )
        );
        const newItems = { ...filteredItems };
        delete newItems[fretNumber];
        setFretboardObject(newItems);
      }
    }, 500);
    return () => {
      clearTimeout(debouncedObjectSetter);
    };
    //construct the final object
  }, [activeStrings]);
  return (
    <div
      style={style}
      ref={ref}
      className={cn(
        "relative h-36 border-x border-gray-600 flex flex-col-reverse gap-3",
        className
      )}
    >
      {new Array(6).fill(9).map((_, index) => {
        return (
          <String
            key={index}
            stringNumber={index + 1}
            setActiveStrings={setActiveStrings}
            activeStrings={activeStrings}
          />
        );
      })}
      {marker && (
        <div
          className="absolute top-[65px]  h-4 w-4 rounded-full bg-white"
          style={{ left: `${middlePoint}px` }}
        />
      )}
      {doubleMarker && (
        <>
          <div
            className="absolute top-[30px]  h-4 w-4 rounded-full bg-white"
            style={{ left: `${middlePoint}px` }}
          />
          <div
            className="absolute  top-[100px]   h-4 w-4 rounded-full bg-white"
            style={{ left: `${middlePoint}px` }}
          />
        </>
      )}
    </div>
  );
}
