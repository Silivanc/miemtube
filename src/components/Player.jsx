import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import './Player.scss';
import config from "../../config/config.js";
import {Videos} from "../../services/Videos.js";

export default function Player() {
    const [videos, setVideos] = useState([])
    const [video, setVideo] = useState(null);  // Состояние для хранения данных о видео
    const [loading, setLoading] = useState(true);  // Состояние для отслеживания загрузки
    const {playlistId, videoId} = useParams();

    useEffect(() => {
        Videos.getVideo(videoId)
            .then(setVideo)
            .catch(error =>
                console.error("Error fetching video:", error))
            .finally(() => setLoading(false));
    }, [videoId])

    useEffect(() => {
        Videos.getVideosFromPlaylist(playlistId).then(setVideos).catch(error =>
            console.error("Error fetching video list:", error)
        );
    }, [playlistId]);

    // Если данные ещё загружаются, выводим сообщение
    if (loading) {
        return <div>Loading...</div>;
    }

    // Если данные о видео не загружены, выводим сообщение об ошибке
    if (!video) {
        return <div>Error loading videos</div>;
    }

    const videoIndex = videos.findIndex(videoElement => videoElement.identifier === video.videoInfo.identifier)
    return (
        <div className="player">
            <div className="container">
                <div className="player-main">
                    <video className="player-main-video"
                           src={video.url} controls autoPlay></video>
                    <div className="player-main-title">{video.videoInfo.title}</div>
                    <div className="player-main-info">
                        <div className="player-main-info-tutor">
                            <img className="player-main-info-tutor-photo" src="../../public/static/images/circtle.png"
                                 alt="Преподаватель"/>
                            <div className="player-main-info-tutor-name">{video.videoInfo.creator}</div>
                        </div>
                        <div className="player-main-info-date">
                            <svg viewBox="0 0 448 512">
                                <path
                                    d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/>
                            </svg>
                            <div className="player-main-info-date-number">{video.videoInfo.start.split('T')[0]}</div>
                        </div>
                        <div className="player-main-info-views">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80z"/>
                            </svg>
                            <div className="player-main-info-views-number">1000000</div>
                        </div>
                    </div>
                    <div className="player-main-course">Название курса: {video.videoInfo.subjects}</div>
                    <div className="player-main-description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi distinctio dolorem
                        exercitationem facilis minima non pariatur quasi similique sit velit? Eaque impedit maiores
                        optio perspiciatis quisquam recusandae similique vel voluptatibus?
                    </div>
                </div>
                <div className="player-recommend">
                    <div className="player-recommend-next">
                        {videos[videoIndex + 1] ?
                            <>
                                <div className="player-recommend-next-text">Следующее видео в плейлисте</div>
                                <RecommendVideo video={videos[videoIndex + 1]} playlistId={playlistId}/>
                            </> : false}
                    </div>
                    <div className="player-recommend-videos">
                        <div className="player-recommend-videos-text">Другие видео в плейлисте</div>
                        {videos.length > 1 ? videos.map((video, index) => {
                            if (index !== videoIndex) {
                                return <RecommendVideo video={videos[index]} playlistId={playlistId}/>
                            }
                        }) : false}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecommendVideo(props) {
    return (
        <div className="player-recommend-video">
            <Link
                to={{
                    pathname: `/${props.playlistId}/${props.video.identifier}`,
                }}>
                <div className="player-recommend-video-preview">
                    <img src={props.video.preview} alt="Видео"/>
                </div>
                <div className="player-recommend-video-info">
                    <div className="player-recommend-video-info-title"
                         title={props.video.title}>{props.video.title}</div>
                    <div className="player-recommend-video-info-tutor">{props.video.creator}</div>
                </div>
            </Link>
        </div>
    )
}
