import { type video } from "@/lib/types/data";
import { useState } from "react";

type ButtonProps = {
  videoProp: video;
};

export function Button({ videoProp }: ButtonProps) {
  const { title, thumbnail, id, link, views } = videoProp;

  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const showPopover = () => {
    setPopoverVisible(true);
  };

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const [copiado, setCopiado] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // Vuelve al estado inicial en 2 segundos
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    // todo: hacer que el botón en el panel reproduzca el video en el modal.
    // todo: dar feedback al usuario de que el video se esta reproduciendo.
    <li className="mx-4 my-2 bg-[#0e1114] group hover:bg-zinc-700 transition duration-300 text-white rounded-lg relative">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        className="relative bg-transparent hover:bg-black/50 transition duration-300 block p-4 text-white rounded-lg"
        onClick={handleClick}
      >
        <picture>
          <img
            src={thumbnail}
            alt={title}
            className="rounded-lg aspect-video object-cover w-full group-hover:scale-107  transition duration-300"
          />
        </picture>
        <div className="bg-black/60 group-hover:bg-transparent transition duration-300 absolute inset-0 rounded-lg overflow-hidden"></div>
        <span className="absolute text-xl truncate inset-0 flex items-center justify-center text-center px-2 z-10 group-hover:text-transparent transition duration-300 m-5">
          <strong>{title}</strong>
        </span>
      </a>
      {/* Popover */}
      <div
        className={`absolute z-20 right-0 bottom-0 ${
          isPopoverVisible
            ? "visible opacity-100 translate-0"
            : "invisible opacity-0 translate-y-1/2"
        } inline-block text-sm text-gray-500 transition duration-300  text-center transform w-full`}
      >
        <div className=" pt-2 rounded-t-lg  via-transparent from-zinc-950 bg-gradient-to-t bg-no-repeat">
          <h3 className="font-semibold text-white">{`${views} vistas`}</h3>
        </div>
        <div data-popper-arrow></div>
      </div>
    </li>
  );
}
