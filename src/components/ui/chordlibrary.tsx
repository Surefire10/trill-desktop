"use client";

import { useFindChordsByKeyAndSuffix } from "@/queries/chord/useFindChordsByKeyAndSuffix";
import { useState } from "react";
import { Guitar } from "@/lib/instrument";
import Chord from "@/components/ui/chord";
import { Skeleton } from "./skeleton";

interface ChordLibraryProps {
  keys: string[];
  suffixes: string[];
}

export function ChordLibrary({ keys, suffixes }: ChordLibraryProps) {
  const [activeKey, setActiveKey] = useState<string>("A");
  const [activeSuffix, setActiveSuffix] = useState<string>("major");

  const chordCollection = useFindChordsByKeyAndSuffix(activeKey, activeSuffix);
  return (
    <section className="indent w-full mt-12 flex flex-col gap-10 ">
      <div className="flex gap-5 ">
        <div className="basis-[10%] flex flex-col bg-[#262626] rounded-lg py-2 text-center gap-2">
          <div
            style={{
              backgroundColor: activeSuffix === "all" ? "#7f1d1d" : "",
              color: activeSuffix === "all" ? "white" : "",
            }}
            className="w-full text-center py-1 rounded-md hover:cursor-pointer hover:bg-[#7f1d1d]"
            key={"all"}
            onClick={() => setActiveSuffix("all")}
          >
            All
          </div>
          {suffixes.map((item) => {
            return (
              <div
                style={{
                  backgroundColor: item === activeSuffix ? "#7f1d1d" : "",
                  color: item === activeSuffix ? "white" : "",
                }}
                className="w-full text-center py-1 rounded-md hover:cursor-pointer hover:bg-[#7f1d1d]"
                key={item}
                onClick={() => setActiveSuffix(item)}
              >
                {activeKey + item}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex  justify-between bg-[#262626] p-2 rounded-lg gap-2">
            {keys.map((item) => {
              return (
                <div
                  key={item}
                  onClick={() => setActiveKey(item)}
                  style={{
                    backgroundColor: item === activeKey ? "#7f1d1d" : "",
                    color: item === activeKey ? "white" : "",
                  }}
                  className="w-full text-center py-1 rounded-md hover:cursor-pointer hover:bg-[#7f1d1d]"
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-4 mt-5">
            {chordCollection.data &&
              chordCollection.data.map((chord, index) => {
                return (
                  <div key={chord.id}>
                    <p className="text-center text-sm text-white/50">
                      {chord.chord.key +
                        chord.chord.suffix +
                        ` ver(${index + 1})`}
                    </p>
                    <Chord chord={chord} instrument={Guitar} />
                  </div>
                );
              })}
          </div>
        </div>
        {chordCollection.isLoading && (
          <div className="grid grid-cols-6 h-48">
            <Skeleton className="w-3/4 h-full"></Skeleton>
            <Skeleton className="w-3/4 h-full"></Skeleton>
            <Skeleton className="w-3/4 h-full"></Skeleton>
            <Skeleton className="w-3/4 h-full"></Skeleton>
            <Skeleton className="w-3/4 h-full"></Skeleton>
            <Skeleton className="w-3/4 h-full"></Skeleton>
          </div>
        )}
      </div>
    </section>
  );
}
