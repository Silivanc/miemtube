import React, { useEffect } from "react";
import backgroundImage from "../../assets/images/main-background.png"
import { useSearchParams } from "react-router-dom";

export function Headline({title}) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={`min-h-[275px] w-full bg-[url("/static/images/main-background.png")] bg-cover bg-center relative flex flex-col justify-center items-center mb-6`}>
            <div className="h-[80px] mb-3 py-4 px-24 text-4xl leading-tight text-white bg-[#244A9A] rounded-[98px] box-border">{title}</div>
            <div className="absolute top-2/3 w-full max-w-[440px]">
                <input 
                    type="text" 
                    placeholder="Поиск..." 
                    className="w-full h-12 pl-12 pr-4 text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchParams.get('search') || ""}
                    onChange={(e) => setSearchParams({'search': e.target.value})}
                />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
            </div>
        </div>
    )
}