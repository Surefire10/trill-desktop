import { SearchIcon } from "lucide-react";
import { Input } from "./input";
export function Search() {
  return (
    <div className="flex items-center">
      <div className="bg-primary p-[8.5px] rounded-bl-md rounded-tl-md ">
        <SearchIcon></SearchIcon>
      </div>
      <Input
        placeholder="Search Chords..."
        className="rounded-br-md rounded-tr-md"
      ></Input>
    </div>
  );
}
