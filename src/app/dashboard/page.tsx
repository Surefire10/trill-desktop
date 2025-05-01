import { ChordLibrary } from "@/components/ui/chordlibrary";
import { Fretboard } from "./sections/fretboard";

export default async function Page({}) {
  const searchData = await getSearchData();

  return (
    <section className="indent pt-30 pb-20 w-full h-full ">
      <Fretboard />
      <ChordLibrary keys={searchData.keys} suffixes={searchData.suffixes} />
    </section>
  );
}

async function getSearchData() {
  const urls = [
    process.env.CHORD_SERVICE_URL + "/chord/key",
    process.env.CHORD_SERVICE_URL + "/chord/suffix",
  ];

  const promises = urls.map(async (url: string) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  });

  const data = await Promise.all(promises);

  return { keys: data[0], suffixes: data[1] };
}
