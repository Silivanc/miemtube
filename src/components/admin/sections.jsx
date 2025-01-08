import { useState } from "react";
import clsx from "clsx";

export function Sections({ type }) {
  if (!["video", "stream", "playlist"].includes(type)) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = ["Загруженные видео", "Загрузить видео"];

  return (
    <div className="flex border-b-[3px] border-[#D9D9D9]">
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)} // При клике обновляем активную вкладку
          className={clsx(
            index === activeIndex ? "bg-[#D9D9D9]" : "", // Изначально первая вкладка выделена
            "h-14 w-[350px] flex justify-center items-center cursor-pointer"
          )}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
