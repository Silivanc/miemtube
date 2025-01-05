import UploadVideo from "../UploadVideo.jsx";
import UploadStream from "../UploadStream.jsx";
import {Link, useLocation, useMatch} from "react-router-dom";
import {PanelControlButton} from "../panelControl/uikit/panelControlButton.jsx";
import {VideoIcon} from "../panelControl/icons/videoIcon.jsx";
import {StreamsIcon} from "../panelControl/icons/streamsIcon.jsx";
import Playlists from "../Playlists.jsx";
import {PlaylistsIcon} from "../panelControl/icons/playlistsIcon.jsx";
import clsx from "clsx";
import {routes} from "../../../config/routes.js";
import { PersonalIcon } from "../panelControl/icons/personalIcon.jsx";

export default function PanelControl({adminInfo}) {
    const location = useLocation();
    const match = useMatch('admin/:page/:section');
    const page = match?.params.page;
    const section = match?.params.section;

    return (
        <div className="flex min-h-screen text-base">
            <div className="flex flex-col  flex-shrink-0 align-items-center
            flex-column pt-[33px] w-[293px] border-r-[3px] border-[#D9D9D9]">
                <div className="flex flex-col w-full">
                    <PanelControlButton Icon={<PersonalIcon/>} name="Личный кабинет" path={routes.personal}/>
                    <PanelControlButton Icon={<VideoIcon/>} name="Видео" path={routes.uploadedVideo}/>
                    <PanelControlButton Icon={<StreamsIcon/>} name="Трансляции" path={routes.uploadedStream}/>
                    <PanelControlButton Icon={<PlaylistsIcon/>} name="Плейлисты" path={routes.uploadedPlaylists}/>
                </div>
            </div>
            <div className="w-full">
                <h1 className="p-[49px] text-3xl font-bold border-b-[3px] border-[#D9D9D9] ">{adminInfo.title}</h1>
                <div className="panel-control-content">
                    { page === 'video' ? (
                        <>
                            <div className="flex border-b-[3px] border-[#D9D9D9]">
                                <Link to={routes.uploadedVideo} className={clsx(section === 'uploaded' ? "bg-[#D9D9D9]" : "hover:bg-[#D9D9D9]",
                                    "h-14 w-[350px] flex justify-center items-center")}>Загруженные видео</Link>
                                <Link to={routes.uploadVideo} className={clsx(section === 'upload' ? "bg-[#D9D9D9]" : "hover:bg-[#D9D9D9]",
                                    "h-14 w-[350px] flex justify-center items-center")}>Загрузить видео</Link>
                            </div>
                            <UploadVideo />
                        </>
                    ) : ( page === 'stream' ? (
                        <>
                            <div className="panel-control-content-sections">
                                <div className="panel-control-content-section">Сохраненные трансляции</div>
                                <div className="panel-control-content-section active">Запланировать трансляцию</div>
                            </div>
                            <UploadStream />
                        </>
                    ) : (<>Не удалось загрузить страницу</>))}
                </div>
            </div>
        </div>
    )
}