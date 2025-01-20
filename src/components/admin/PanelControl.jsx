import { useMatch } from "react-router-dom";
import { PanelControlButton } from "../panelControl/uikit/panelControlButton.jsx";
import { VideoIcon } from "../panelControl/icons/videoIcon.jsx";
import { PlaylistsIcon } from "../panelControl/icons/playlistsIcon.jsx";
import { PersonalIcon } from "../panelControl/icons/personalIcon.jsx";
import { StreamsIcon } from "../panelControl/icons/streamsIcon.jsx";
import { UsersIcon } from "../panelControl/icons/personalIcon.jsx";
import { routes } from "../../../config/routes.js";
import { useEffect, useState } from "react";
import { Personal } from "./personal/Personal.jsx";
import { Users } from "./users/Users.jsx";
import { UploadedStreams } from "./streams/UploadedStreams.jsx";
import { CreateStream } from "./streams/CreateStream.jsx";
import { UploadedVideo } from "./video/UploadedVideo.jsx";
import { UploadVideo } from "./video/UploadVideo.jsx";
import { UploadedPlaylists } from "./playlists/UploadedPlaylists.jsx";
import { Sections } from "./Sections.jsx";
import { AddUser } from "./users/AddUser.jsx";
import { StreamSources } from "./streams/streamSources.jsx";

const pages = {
  personal: {
    section: "Личный кабинет",
    name: "Личный кабинет",
    icon: <PersonalIcon />,
    path: routes.admin,
    component: <Personal />,
  },
  video: {
    section: "Панель управления контентом",
    icon: <VideoIcon />,
    path: routes.adminVideo,
    tabs: [
      {
        name: "Мои видео",
        component: <UploadedVideo isAdmin={true} />,
      },
      {
        name: "Загрузить видео",
        component: <UploadVideo />,
      },
    ],
  },
  stream: {
    section: "Панель управления контентом",
    icon: <StreamsIcon />,
    path: routes.adminStream,
    tabs: [
      {
        name: "Мои трансляции",
        component: <UploadedStreams isAdmin={true} />,
      },
      {
        name: "Запланировать трансляцию",
        component: <CreateStream />,
      },
      {
        name: "Управление источниками",
        component: <StreamSources />,
      },
    ],
  },
  playlist: {
    section: "Панель управления контентом",
    icon: <PlaylistsIcon />,
    path: routes.adminPlaylist,
    tabs: [
      {
        name: "Мои плейлисты",
        component: <UploadedPlaylists isAdmin={true} />,
      },
      {
        name: "Создать плейлист",
        component: <CreateStream />,
      },
    ],
  },
  users: {
    section: "Панель управления пользователями",
    icon: <UsersIcon />,
    path: routes.adminUsers,
    tabs: [
      {
        name: "Пользователи",
        component: <Users isAdmin={true} />,
      },
      {
        name: "Добавить пользователя",
        component: <AddUser />,
      },
    ],
  },
};

export default function PanelControl({ adminInfo }) {
  const match = useMatch("/admin/:page/:section?");
  const page = match?.params?.page;
  const section = match?.params?.section;
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (["video", "stream", "playlist", "users"].includes(page)) {
      setPageInfo(pages[page]);
    } else {
      setPageInfo(pages["personal"]);
    }
  }, [page, section]);

  return (
    <div className="flex min-h-screen text-base">
      <div
        className="flex flex-col  flex-shrink-0 align-items-center
            flex-column pt-[33px] w-[293px] border-r-[3px] border-[#D9D9D9]"
      >
        <div className="flex flex-col w-full">
          {Object.values(pages).map((element) => (
            <PanelControlButton
              key={element.path}
              Icon={element.icon}
              name={element.name ? element.name : element.tabs[0].name}
              path={element.path}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <h1 className="p-[49px] text-3xl font-bold border-b-[3px] border-[#D9D9D9] ">
          {pageInfo.section}
        </h1>
        <div className="panel-control-content">
          {!pageInfo.tabs ? (
            pageInfo.component
          ) : (
            <Sections tabs={pageInfo.tabs} />
          )}
        </div>
      </div>
    </div>
  );
}
