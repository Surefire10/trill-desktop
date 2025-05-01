"use client";

import { cn } from "@/lib/utils";
import { String } from "./string";
import { useEffect, useRef, useState } from "react";
import { useIsFirstMount } from "@/hooks/useIsFirstMount";

interface FretProps {
  className?: string;
  fretNumber: number;
  marker?: boolean;
  doubleMarker?: boolean;
  style: React.CSSProperties;
  mutedStrings: number[];
  updateFunction: (id: number, newMap: Map<number, number[][]>) => void;
}

export function Fret({
  className,
  fretNumber,
  marker,
  doubleMarker,
  style,
  mutedStrings,
  updateFunction,
}: FretProps) {
  const [middlePoint, setMiddlePoint] = useState(10);
  const [fretInfoMap, setFretInfoMap] = useState<Map<number, number[][]>>(
    () => new Map()
  );
  const ref = useRef<HTMLDivElement>(null);
  const isFirstMount = useIsFirstMount();

  useEffect(() => {
    if (isFirstMount) {
      const dot = ref.current!.getBoundingClientRect().width / 2 - 10; //takeaway 10 cause it's roughly the width of the dot;
      setMiddlePoint(dot);
      return;
    }
    updateFunction(fretNumber, fretInfoMap);
  }, [middlePoint, fretInfoMap]);

  return (
    <div
      style={style}
      ref={ref}
      className={cn(
        "relative h-36 border border-gray-700 flex flex-col-reverse gap-3",
        className
      )}
    >
      {new Array(6).fill(9).map((_, index) => {
        return (
          <String
            key={index}
            stringNumber={index + 1}
            middlePoint={middlePoint}
            fretNumber={fretNumber}
            setFretInfoMap={setFretInfoMap}
            mutedStrings={mutedStrings}
          />
        );
      })}
      {marker && (
        <div
          className="absolute top-[64px]  h-4 w-4 rounded-full bg-white"
          style={{ left: `${middlePoint}px` }}
        />
      )}
      {doubleMarker && (
        <>
          <div
            className="absolute top-[27px]  h-4 w-4 rounded-full bg-white"
            style={{ left: `${middlePoint}px` }}
          />
          <div
            className="absolute  top-[98px]   h-4 w-4 rounded-full bg-white"
            style={{ left: `${middlePoint}px` }}
          />
        </>
      )}
    </div>
  );
}
