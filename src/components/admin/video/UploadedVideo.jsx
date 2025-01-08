import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos";
import editIcon from '../../../assets/images/edit.svg';
import trashIcon from '../../../assets/images/trash.svg';
import linkIcon from '../../../assets/images/link.svg';

export function UploadedVideo({ isAdmin }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        Videos.getVideosWithDuration()
            .then(setVideos)
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, [isAdmin]);

    console.log(videos);

    return (
        <div className="p-0 w-full">
            {/* Заголовок */}
            <div className="grid grid-cols-5 gap-4 items-center bg-gray-100 font-medium text-left p-4 border-b border-gray-300">
                <span>Название</span>
                <span>Плейлист</span>
                <span>Дата создания</span>
                <span>Длительность</span>
                <span>Действия</span>
            </div>

            {/* Данные видео */}
            {videos.length > 0 ? (
                videos.map((video, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50"
                    >
                        <span>{video.title}</span>
                        <span>{video.series}</span>
                        <span>{video.created}</span>
                        <span>{video.duration}</span>
                        <div className="flex gap-2">
                            <button className="w-6 h-6 flex items-center justify-center">
                                <img src={editIcon} alt="Редактировать" className="w-6 h-6" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center">
                                <img src={trashIcon} alt="Удалить" className="w-6 h-6" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center">
                                <img src={linkIcon} alt="Ссылка" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-4 text-center border-b border-gray-200">Загрузка...</div>
            )}
        </div>
    );
}