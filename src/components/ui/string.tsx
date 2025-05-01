import { useIsFirstMount } from "@/hooks/useIsFirstMount";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface StringProps {
  stringNumber: number;
  middlePoint: number;
  fretNumber: number;
  mutedStrings: number[];
  setFretInfoMap: Dispatch<SetStateAction<Map<number, number[][]>>>;
}
export function String({
  stringNumber,
  middlePoint,
  fretNumber,
  mutedStrings,
  setFretInfoMap,
}: StringProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [fingerNumber, setFingerNumber] = useState<number>(1);
  const isFirstMount = useIsFirstMount();

  useEffect(() => {
    if (isFirstMount) {
      return;
    }
    if (mutedStrings.includes(stringNumber)) {
      handleClick();
    }

    if (toggle && !isFirstMount) {
      setFretInfoMap((prevMap) => {
        const newMap = new Map(prevMap);

        if (!newMap.has(fretNumber) || newMap.get(fretNumber)?.length === 0) {
          newMap.set(fretNumber, [[fingerNumber, stringNumber]]);
        } else {
          const totalItems = newMap.get(fretNumber)!;
          totalItems.push([fingerNumber, stringNumber]);
          const seenPairs = new Set();
          const seenString = new Set();
          const resultArray: number[][] = [];
          //we loop backwards because we only want the latest finger-string combo
          for (let i = totalItems.length - 1; i >= 0; i--) {
            const [finger, string] = totalItems[i];
            const key = finger + "-" + string;
            //if you've seen the pair, skip. deduping
            if (seenPairs.has(key)) continue;
            //if you haven't already seen the string then add it into the seen pile, on both accounts -- this is what gives us the last combo since we go backwards.
            if (!seenString.has(string)) {
              seenPairs.add(key);
              seenString.add(string);
              resultArray.push([finger, string]);
            }
          }

          newMap.set(fretNumber, resultArray);
        }
        return newMap;
      });
    } else {
      setFretInfoMap((prevMap) => {
        const fretInfo = new Map(prevMap).get(fretNumber) ?? [];
        const newMap = new Map(prevMap);
        const filteredArray = fretInfo.filter(
          ([innerFingerNumber, innerStringNumber]) => {
            return !(
              innerFingerNumber === fingerNumber &&
              innerStringNumber === stringNumber
            );
          }
        );
        newMap.set(fretNumber, filteredArray);

        return newMap;
      });
      setFingerNumber(1);
    }
  }, [toggle, fingerNumber, mutedStrings]);

  function handleFingerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setFingerNumber((current) => {
      return current >= 5 ? 1 : current + 1;
    });
  }
  function handleClick() {
    setToggle((current) => {
      if (mutedStrings.includes(stringNumber)) {
        return false;
      }
      return !current;
    });
  }

  return (
    <div
      className="relative w-full h-3 border-white hover:border-red-700 hover:cursor-pointer"
      style={{
        borderTopWidth: `${stringNumber - 0.8}px`,
        borderTopStyle: "solid",
        ...(toggle && { borderTopColor: "#ae1a12" }),
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {toggle && (
        <div
          className="absolute h-5 w-5 -top-3 bg-gray-700/80 rounded-full hover:bg-gray-500 z-[3]"
          style={{ left: `${middlePoint - 4}px` }}
          onClick={(e) => {
            if (mutedStrings.includes(stringNumber)) return;
            handleFingerClick(e);
          }}
        >
          <p className="ml-1.5 mt-0 text-sm">{fingerNumber}</p>
        </div>
      )}
    </div>
  );
}
