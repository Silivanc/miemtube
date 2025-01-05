import {useLocation} from "react-router-dom";
import {useState} from "react";
import { Headline } from "../components/contentLayout/Headline";

export default function ContentLayout() {
    const location = useLocation();

    return (
        <div>
            <Headline title="Лекторий ВШЭ"></Headline>
            
        </div>
    )
}