"use client";

import Image from "next/image";
import Link from "next/link";
interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Header({}: HeaderProps) {
  return (
    <header className="fixed top-10 flex justify-center w-full">
      <div className="flex bg-grey w-2/3 rounded-lg justify-between px-5 py-3">
        <div className="flex items-center justify-center ">
          <div className="w-14">
            <Image
              src={"/images/eq.png"}
              alt="white"
              width={1000}
              height={1000}
            />
          </div>
          <h1 className="font-manrope text-2xl font-light text-white">trill</h1>
        </div>
        <div className="flex items-center justify-center gap-4 font-manrope font-light">
          <Link href="#fretboard">Fretboard</Link>
          <Link href="#lookup">Chord Lookup</Link>
        </div>
      </div>
    </header>
  );
}
