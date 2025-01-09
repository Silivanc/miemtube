import {useState, useEffect} from 'react';
import "../../config/config.js"
import {useLocation} from "react-router-dom";
import { MediaItems } from './contentLayout/media/mediaItems.jsx';
import { Headline } from './contentLayout/Headline.jsx';

export default function Streams() {
return (
            <div className="playlists">
                <Headline title="Трансляции"></Headline>
                <div className="container">
                    <div className="playlists-search">
                        <input type="text" className="playlists-search-specialization playlists-search-element"
                               placeholder="Направление"/>
                        <input type="text" className="playlists-search-title playlists-search-element"
                               placeholder="Название"/>
                        <button className="playlists-search-button playlists-search-element">Найти</button>
                    </div>
                    <div className="playlists-list">
                        <MediaItems type="streams"></MediaItems>
                    </div>
                </div>
            </div>
        )

}