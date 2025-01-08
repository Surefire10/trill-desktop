import { useState } from "react";

interface StringProps {
  activeStrings: number[];
  setActiveStrings: (numbers: number[]) => void;
  stringNumber: number;
}
export function String({
  activeStrings,
  setActiveStrings,
  stringNumber,
}: StringProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  function clickHandler(stringNumber: number) {
    if (!activeStrings.includes(stringNumber)) {
      // Add the string number if it's not already in the array
      setActiveStrings([stringNumber, ...activeStrings]);
    } else {
      // Remove the string number if it exists in the array
      const updatedStrings = activeStrings.filter(
        (item) => item !== stringNumber
      );
      setActiveStrings(updatedStrings);
    }
    setToggle((value) => !value);
  }

  return (
    <div
      className="w-full h-3 hover:border-red-700 hover:cursor-pointer"
      style={{
        borderTopWidth: `${stringNumber - 0.8}px`,
        borderTopStyle: "solid",
        ...(toggle && { borderTopColor: "#ae1a12" }),
      }}
      onClick={() => {
        clickHandler(stringNumber);
      }}
    ></div>
  );
}
