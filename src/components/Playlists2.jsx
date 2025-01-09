import React, {useState, useEffect} from 'react';
import {Videos} from "../../services/Videos.js";
import "./Playlists.scss"
import {Link, useLocation} from "react-router-dom";
import Playlist from "./Playlist.jsx";
import { MediaItems } from './contentLayout/media/mediaItems.jsx';
import { Headline } from './contentLayout/Headline.jsx';

export default function Playlists() {

        return (
            <div className="playlists">
                <Headline title="Курсы"></Headline>
                <div className="container">
                    <div className="playlists-search">
                        <input type="text" className="playlists-search-specialization playlists-search-element"
                               placeholder="Направление"/>
                        <input type="text" className="playlists-search-title playlists-search-element"
                               placeholder="Название"/>
                        <button className="playlists-search-button playlists-search-element">Найти</button>
                    </div>
                    <div className="playlists-list">
                        <MediaItems type="playlists"></MediaItems>
                    </div>
                </div>
            </div>
        )
    }