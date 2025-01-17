import clsx from "clsx";
import { useState } from "react";

export function Sections({tabs}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="flex border-b-[3px] border-[#D9D9D9]">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => setActiveIndex(index)}  // При клике обновляем активную вкладку
                    className={clsx(
                        index === activeIndex ? "bg-[#D9D9D9]" : "", // Изначально первая вкладка выделена
                        "h-14 w-[350px] flex justify-center items-center cursor-pointer"
                    )}
                >
                    {tab.name}
                </div>
            ))}
      </div>
      {tabs && tabs[activeIndex] && tabs[activeIndex].component }
    </>
      
  );
}
