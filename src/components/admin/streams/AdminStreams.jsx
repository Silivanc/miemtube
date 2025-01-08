import { useState } from "react";
import { UploadedStreams } from "./UploadedStreams";
import clsx from "clsx";

export function AdminStreams() {
    const [activeIndex, setActiveIndex] = useState(0);  // Состояние для отслеживания активной вкладки

    return (
        <div>
            {/* Передаем setActiveIndex для изменения активной вкладки */}
            <Sections activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

            {/* Условный рендеринг компонента в зависимости от активной вкладки */}
            {activeIndex === 0 ? <UploadedStreams isAdmin={true}/> : <></>}
        </div>
    );
}

function Sections({activeIndex, setActiveIndex}) {
    const tabs = ["Мои трансляции", "Запланировать трансляцию"];

    return (
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
                    {tab}
                </div>
            ))}
        </div>
    );
}