import {HttpRequest} from "../../services/Http.js";
import {Videos} from "../../services/Videos.js";
import config from "../../config/config.js";
import {Link, useParams} from 'react-router-dom';
import "./Playlist.scss";

import React, {useState, useEffect} from 'react';

export default function Playlist(props) {
    const { playlistId } = useParams();
    // Используем state для хранения списка видео
    const [playlist, setPlaylist] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        Videos.getPlaylist(playlistId).then(setPlaylist).catch(error =>
            console.error("Error fetching video list:", error)
        );
    }, [playlistId]);

    useEffect(() => {
        Videos.getVideosFromPlaylist(playlistId).then(setVideos).catch(error =>
            console.error("Error fetching video list:", error)
        );
    }, [playlistId])

    if (videos) {
        return (
            <div className="playlist">
                {videos.length === 0 ? (
                    <p>Плейлист пустой</p>
                ) : (
                    <>
                        <div className="container">
                            <div className="playlist-info">
                                <div className="playlist-info-preview">
                                    <img src="../../public/static/images/name.png" alt=""/>
                                </div>
                                <div className="playlist-info-title">{playlist.title}</div>
                                <div className="playlist-info-author">{playlist.creator}</div>
                                <div className="playlist-info-description">{playlist.description}</div>
                            </div>

                            <div className="playlist-content">
                                <h1 className="playlist-content-title">Видео</h1>
                                <div className="">
                                    <div className="grid grid-cols-4 p-[14px] border-t-2 border-b-2">
                                        <div></div>
                                        <div>Название</div>
                                        <div>Размер</div>
                                        <div>Дата изменения</div>
                                    </div>
                                    {videos.map((video, index) => (
                                        <Link
                                            to={{
                                                pathname: `/${playlistId}/${video.identifier}`
                                            }}
                                            key={index}>
                                            <div className="playlist-content-video grid grid-cols-4 py-[6px] px-0">
                                                <div>
                                                    <img className="playlist-content-video-preview w-[204px] h-[113px]"
                                                         src={video.preview} alt="Видео"/>
                                                </div>
                                                <div>
                                                    <div
                                                        className="playlist-content-video-title font-semibold">{video.title}</div>
                                                    <div className="playlist-content-video-tutor">Имя
                                                        преподавателя
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="playlist-content-video-size">{video.size} МБ</div>
                                                </div>
                                                <div>
                                                    <div
                                                        className="playlist-content-video-data">{video.start.split('T')[0]}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

