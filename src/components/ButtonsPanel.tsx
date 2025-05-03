import { type video } from "@/lib/types/data";
import { Button } from "./Button";
import { useMemo, useState } from "react";
import { Loading } from "./Loading";
import { Warning } from "./Warning";
import { Lines } from "./icons";

interface Props {
  videos: video[] | null | any[];
  error?: string;
}

export default function ButtonsPanel({ videos, error }: Props) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const filterVideos = useMemo(() => {
    console.log("Filtrando videos...");

    if (!videos) return []; // Si no hay videos, devuelve un array vacío

    let filtered = videos;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por vistas (de mayor a menor)
    return [...filtered].sort((a, b) => b.views - a.views);
  }, [searchTerm, videos]);

  return (
    <>
      <div className="relative w-full flex items-center max-w-sm mx-auto mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Lines />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          placeholder="Buscar por nombre o link..."
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p>Error: {error}</p>}
      {!videos && !error && <Loading />}
      {filterVideos.length > 0 ? (
        <ul className="grid md:grid-cols-4 m-auto h-[900px] overflow-auto w-[75%]">
          {filterVideos?.map((video: video) => (
            <Button key={String(video.id)} videoProp={video} />
          ))}
        </ul>
      ) : (
        <Warning>
          <div>
            <span className="font-medium">Espera!</span> No existe esa fuente de
            dopamina.
          </div>
        </Warning>
      )}
    </>
  );
}
