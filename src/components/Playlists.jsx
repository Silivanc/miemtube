import React, {useState, useEffect} from 'react';
import {Videos} from "../../services/Videos.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Playlists.scss"
import {Link, useLocation} from "react-router-dom";
import Playlist from "./Playlist.jsx";
export default function Playlists() {

    const [playlists, setPlaylists] = useState([]);
    const location = useLocation();
    const [mediaContent, setMediaContent] = useState({})

    if (location.pathname === '/playlists') {
        useEffect(() => {
            Videos.getPlaylists()
                .then(result => {
                    let newMediaContent = {};
                    if (mediaContent && mediaContent.name === 'Курсы') {
                        newMediaContent = {
                            ...mediaContent,
                            mediaElements: result
                        }
                    } else {
                        newMediaContent.name = 'Курсы';
                        newMediaContent.mediaElements = result;
                    }
                    setMediaContent(newMediaContent);
                })
                .catch(error => {
                    console.error("Error fetching playlists:", error);
                });
        }, []);
    }

    if (location.pathname === '/streams') {
        useEffect(() => {
            Videos.getStreams()
                .then(result => {
                    let newMediaContent = {};
                    if (mediaContent && mediaContent.name === 'Трансляции') {
                        newMediaContent = {
                            ...mediaContent,
                            mediaElements: result
                        }
                    } else {
                        newMediaContent.name = 'Трансляции';
                        newMediaContent.mediaElements = result;
                    }
                    setMediaContent(newMediaContent);
                })
                .catch(error => {
                    console.error("Error fetching playlists:", error);
                });
        }, []);
    }

    useEffect(() => {
        Videos.getPlaylists()
            .then(setPlaylists)
            .catch(error => {
                console.error("Error fetching playlists:", error);
            });
    }, []);


    if (mediaContent) {
        return (
            <div className="playlists">
                <div className="playlists-main">
                    <div className="playlists-main-title">{mediaContent.name}</div>
                </div>
                <div className="container">
                    <div className="playlists-search">
                        <input type="text" className="playlists-search-specialization playlists-search-element"
                               placeholder="Направление"/>
                        <input type="text" className="playlists-search-title playlists-search-element"
                               placeholder="Название"/>
                        <button className="playlists-sesrch-button playlists-search-element">Найти</button>
                    </div>
                    <div className="playlists-list">
                        {playlists.length === 0 ? (
                                <div>Плейлисты отсутсвуют</div>
                            ) :
                            (<Container>
                                <Row>
                                    {playlists.map((playlist, index) => {
                                        return (
                                            <Col xs={4}>
                                                <Link
                                                    to={{
                                                        pathname: `/${playlist.identifier}`
                                                    }}
                                                    key={index}>
                                                    <div className="playlists-element">
                                                        <div className="playlists-element-image">
                                                            <img src="../../public/static/images/name.png" alt="Обложка плейлиста"/>
                                                        </div>
                                                        <div className="playlists-element-info">
                                                            <div className="playlists-element-info-photo">
                                                                <img src="" alt="Фото преподавателя"/>
                                                            </div>
                                                            <div className="playlists-element-info-text">
                                                                <div
                                                                    className="playlists-element-info-title">{playlist.title}</div>
                                                                <div
                                                                    className="playlists-element-info-author">{playlist.creator}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>)
                                    })}
                                </Row>
                            </Container>)}
                    </div>
                </div>
            </div>
        )
    }
}