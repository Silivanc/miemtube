import React, {useState, useEffect} from 'react';
import {Videos} from "../../services/Videos.js";
import "./Playlists.scss"
import {Link, useLocation} from "react-router-dom";
import Playlist from "./Playlist.jsx";

export default function Playlists2() {

    const [playlists, setPlaylists] = useState([]);
    const location = useLocation();
    const [mediaContent, setMediaContent] = useState({})

    const updateMediaContent = (result, pathname) => {
        let name = "Курсы";
        if (pathname === '/playlists')  {
            name = 'Курсы';
        } else if (pathname === '/streams') {
            name = 'Трансляции';
        }
        let newMediaContent = {
            name,
            mediaElements: result,
        };
        setMediaContent(newMediaContent);
    }

    useEffect(() => {
        Videos.getMediaContent(location.pathname)
            .then(result => updateMediaContent(result, location.pathname))
            .catch(error => {
                console.error(`Error fetching ${location.pathname}: `, error);
            });
    }, []);

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
                        <button className="playlists-search-button playlists-search-element">Найти</button>
                    </div>
                    <div className="playlists-list">
                        {playlists.length === 0 ? (
                                <div>{mediaContent.name} отсутсвуют</div>
                            ) :
                            <div className="grid grid-cols-4">
                                {playlists.map((playlist, index) => {
                                    return (
                                        <Link
                                            to={{
                                                pathname: `/${playlist.identifier}`
                                            }}
                                            key={index}>
                                            <div className="playlists-element">
                                                <div className="playlists-element-image">
                                                    <img src=""
                                                         alt="Обложка плейлиста"/>
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
                                    )
                                })}
                            </div>
                        }
                        <div className="grid grid-cols-4 ">
                            <Link
                                to={{
                                    pathname: `/`
                                }}>
                                <div className="playlists-element">
                                    <div className="playlists-element-image">
                                        <img src=""
                                             alt="Обложка плейлиста"/>
                                    </div>
                                    <div className="playlists-element-info">
                                        <div className="playlists-element-info-photo">
                                            <img src="" alt="Фото преподавателя"/>
                                        </div>
                                        <div className="playlists-element-info-text">
                                            <div
                                                className="playlists-element-info-title">Название</div>
                                            <div
                                                className="playlists-element-info-author">Автор</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/`
                                }}>
                                <div className="playlists-element">
                                    <div className="playlists-element-image">
                                        <img src=""
                                             alt="Обложка плейлиста"/>
                                    </div>
                                    <div className="playlists-element-info">
                                        <div className="playlists-element-info-photo">
                                            <img src="" alt="Фото преподавателя"/>
                                        </div>
                                        <div className="playlists-element-info-text">
                                            <div
                                                className="playlists-element-info-title">Название</div>
                                            <div
                                                className="playlists-element-info-author">Автор</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/`
                                }}>
                                <div className="playlists-element">
                                    <div className="playlists-element-image">
                                        <img src=""
                                             alt="Обложка плейлиста"/>
                                    </div>
                                    <div className="playlists-element-info">
                                        <div className="playlists-element-info-photo">
                                            <img src="" alt="Фото преподавателя"/>
                                        </div>
                                        <div className="playlists-element-info-text">
                                            <div
                                                className="playlists-element-info-title">Название</div>
                                            <div
                                                className="playlists-element-info-author">Автор</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/`
                                }}>
                                <div className="playlists-element">
                                    <div className="playlists-element-image">
                                        <img src=""
                                             alt="Обложка плейлиста"/>
                                    </div>
                                    <div className="playlists-element-info">
                                        <div className="playlists-element-info-photo">
                                            <img src="" alt="Фото преподавателя"/>
                                        </div>
                                        <div className="playlists-element-info-text">
                                            <div
                                                className="playlists-element-info-title">Название</div>
                                            <div
                                                className="playlists-element-info-author">Автор</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to={{
                                    pathname: `/`
                                }}>
                                <div className="playlists-element">
                                    <div className="playlists-element-image">
                                        <img src=""
                                             alt="Обложка плейлиста"/>
                                    </div>
                                    <div className="playlists-element-info">
                                        <div className="playlists-element-info-photo">
                                            <img src="" alt="Фото преподавателя"/>
                                        </div>
                                        <div className="playlists-element-info-text">
                                            <div
                                                className="playlists-element-info-title">Название</div>
                                            <div
                                                className="playlists-element-info-author">Автор</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}