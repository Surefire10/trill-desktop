import { Search } from "./search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChordLookupHeaderProps {
  searchData: {
    keys: string[];
    suffixes: string[];
  };
}

export function ChordLookupHeader({ searchData }: ChordLookupHeaderProps) {
  return (
    <div className="flex flex-row-reverse items-center w-full border rounded-md border-grey py-2 px-2  gap-10 ">
      {/* <Search /> */}
      <Search />
      <div className="w-1/2">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Key" />
          </SelectTrigger>
          <SelectContent>
            {searchData.keys.map((item: string) => {
              return (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/2">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Suffix" />
          </SelectTrigger>
          <SelectContent>
            {searchData.suffixes.map((item: string) => {
              return (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
