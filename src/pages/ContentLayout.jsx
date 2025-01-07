import {useLocation} from "react-router-dom";
import {useState} from "react";
import { Headline } from "../components/contentLayout/Headline";
import { MediaItems } from "@/components/contentLayout/media/mediaItems";

export default function ContentLayout() {
    const location = useLocation();

    return (
        <div>
            <Headline title="Лекторий ВШЭ"></Headline>
            <div className="container ">
            <h1 className="text-2xl font-semibold mb-5">Видео</h1>
             <MediaItems type="videos" amount={8}></MediaItems>
             <h1 className="text-2xl font-semibold mb-5">Трансляции</h1>
             <MediaItems type="playlists" amount={4}></MediaItems>
             <h1 className="text-2xl font-semibold mb-5">Курсы</h1>
             <MediaItems type="playlists" amount={8}></MediaItems>
            </div>
        </div>
    )
}