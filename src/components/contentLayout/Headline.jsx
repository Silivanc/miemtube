import React from "react";
import backgroundImage from "../../assets/images/main-background.png"

export function Headline({title}) {
    return (
        <div className={`min-h-[275px] w-full bg-[url("static/images/main-background.png")] bg-cover bg-center flex justify-center items-center mb-6`}>
            <div className="h-[80px] py-4 px-24 text-4xl leading-tight text-white bg-[#244A9A] rounded-[98px] box-border">{title}</div>
        </div>
    )
}