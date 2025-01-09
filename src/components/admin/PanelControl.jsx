import {Link, useLocation, useMatch} from "react-router-dom";
import {PanelControlButton} from "../panelControl/uikit/panelControlButton.jsx";
import {VideoIcon} from "../panelControl/icons/videoIcon.jsx";
import {PlaylistsIcon} from "../panelControl/icons/playlistsIcon.jsx";
import { PersonalIcon } from "../panelControl/icons/personalIcon.jsx";
import {StreamsIcon} from "../panelControl/icons/streamsIcon.jsx";
import clsx from "clsx";
import {routes} from "../../../config/routes.js";
import { useEffect, useState } from "react";
import { Personal } from "./personal/Personal.jsx";
import { AdminVideo } from "./video/AdminVideo.jsx";
import { AdminPlaylist } from "./playlists/AdminPlaylist.jsx";
import { Sections } from "./sections.jsx";
import { AdminStreams } from "./streams/AdminStreams.jsx";

export default function PanelControl({adminInfo}) {
    const location = useLocation();
    const match = useMatch('/admin/:page/:section?');
    const page = match?.params?.page;
    const section = match?.params?.section;
    const [pageInfo, setPageInfo] = useState({});

    useEffect(() => {
            let newPageInfo = {...pageInfo};
            if (page === undefined) {
                newPageInfo.title = 'Личный кабинет';
                newPageInfo.component = <Personal></Personal>
            } else {
                newPageInfo.title = 'Панель управления контента';
            }

            if (page === 'video') {
                newPageInfo.component = <AdminVideo/>;
                newPageInfo.name = "видео";
            } else if (page === 'stream') {
                newPageInfo.component = <AdminStreams/>;
                newPageInfo.name = "стрим";
            } else if (page === 'playlist') {
                newPageInfo.component = <AdminPlaylist/>;
                newPageInfo.name = "плейлист";
            }
    
            setPageInfo(newPageInfo);
        }, [page, section])

        console.log(pageInfo)

    return (
        <div className="flex min-h-screen text-base">
            <div className="flex flex-col  flex-shrink-0 align-items-center
            flex-column pt-[33px] w-[293px] border-r-[3px] border-[#D9D9D9]">
                <div className="flex flex-col w-full">
                    <PanelControlButton Icon={<PersonalIcon/>} name="Личный кабинет" path={routes.admin}/>
                    <PanelControlButton Icon={<VideoIcon/>} name="Видео" path={routes.adminVideo}/>
                    <PanelControlButton Icon={<StreamsIcon/>} name="Трансляции" path={routes.adminStream}/>
                    <PanelControlButton Icon={<PlaylistsIcon/>} name="Плейлисты" path={routes.adminPlaylist}/>
                </div>
            </div>
            <div className="w-full">
                <h1 className="p-[49px] text-3xl font-bold border-b-[3px] border-[#D9D9D9] ">{pageInfo.title}</h1>
                <div className="panel-control-content">
                    {pageInfo.component}
                </div>
            </div>
        </div>
    )
}