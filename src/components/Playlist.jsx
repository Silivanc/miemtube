import {HttpRequest} from "../../services/Http.js";
import {Videos} from "../../services/Videos.js";
import config from "../../config/config.js";
import {Link, useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                                <Container fluid>
                                    <Row className="playlist-content-params">
                                        <Col xs={{span: 4, offset: 3}}>Название</Col>
                                        <Col xs={2}>Размер</Col>
                                        <Col xs={2}>Дата изменения</Col>
                                    </Row>
                                    {videos.map((video, index) => (
                                        <Link
                                            to={{
                                                pathname: `/${playlistId}/${video.identifier}`
                                            }}
                                            key={index}>
                                            <Row className="playlist-content-video">
                                                <Col xs={3}>
                                                    <img className="playlist-content-video-preview"
                                                         src={video.preview} alt="Видео"/>
                                                </Col>
                                                <Col xs={4}>
                                                    <div
                                                        className="playlist-content-video-title">{video.title}</div>
                                                    <div className="playlist-content-video-tutor">Имя
                                                        преподавателя
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <div className="playlist-content-video-size">{video.size} МБ</div>
                                                </Col>
                                                <Col xs={2}>
                                                    <div
                                                        className="playlist-content-video-data">{video.start.split('T')[0]}</div>
                                                </Col>
                                            </Row>
                                        </Link>
                                    ))}
                                </Container>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

