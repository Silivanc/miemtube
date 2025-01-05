import { Link } from "../../../../node_modules/react-router-dom/dist/index.js";
import {PlaylistsIcon} from "../icons/playlistsIcon.jsx";
import {StreamsIcon} from "../icons/streamsIcon.jsx";
import {VideoIcon} from "../icons/videoIcon.jsx";

export function PanelControlButton({Icon, name, path}) {
    return (
        <Link to={path} className="flex h-[55px] pl-[47px] items-center border-0 cursor-pointer bg-white hover:bg-[#D9D9D9] w-full">
        {Icon}
            <span className="pl-2">{name}</span>
        </Link>
    )
}