import { routes } from "../../../config/routes";
import { PersonalIcon, UsersIcon } from "../panelControl/icons/personalIcon";
import { PlaylistsIcon } from "../panelControl/icons/playlistsIcon";
import { VideoIcon } from "../panelControl/icons/videoIcon";
import { UploadedPlaylists } from "./playlists/UploadedPlaylists";
import { CreateStream } from "./streams/CreateStream";
import { UploadedStreams } from "./streams/UploadedStreams";
import { AddUser } from "./users/AddUser";
import { Users } from "./users/Users";
import { UploadedVideo } from "./video/UploadedVideo";
import { UploadVideo } from "./video/UploadVideo";
import { Personal } from "./personal/Personal";
import { StreamsIcon } from "../panelControl/icons/streamsIcon";
import { StreamSources } from "./streams/streamSources";

export const pages = {
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
