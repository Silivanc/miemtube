import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {HttpRequest} from "../../services/Http.js";
import config from "../../config/config.js";
import {Videos} from "../../services/Videos.js";
import {ContentRequest} from "../../services/ContentRequest.js";
import "./Player.scss"

function Stream() {

    return (
        // <div>
        //     {error ? (
        //         <p style={{ color: 'red' }}>Ошибка: {error}</p>
        //     ) : (
        //         // <video src="http://localhost:1984/api/stream.mjpeg?src=str" controls style={{ width: '100%', maxWidth: '600px' }} />
        //
        //         )}
        // </div>
        <div className="player">
            <div className="container">
                <div className="player-main">
                    <video className="player-main-video" src="http://localhost:80/api/stream.mp4?src=bd5b629b-4553-483a-9a02-76b6bb1a8bd8" controls autoPlay muted>
                    </video>
                    <div className="player-main-info">
                        <div className="player-main-info-tutor">
                            <img className="player-main-info-tutor-photo" src="../../public/static/images/circtle.png"
                                 alt="Преподаватель"/>
                            <div className="player-main-info-tutor-name">Admin</div>
                        </div>
                        <div className="player-main-info-date">
                            <svg viewBox="0 0 448 512">
                                <path
                                    d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/>
                            </svg>
                            <div className="player-main-info-date-number">22.11.2024</div>
                        </div>
                        <div className="player-main-info-views">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80z"/>
                            </svg>
                            <div className="player-main-info-views-number">100000</div>
                        </div>
                    </div>
                </div>
                <div className="player-recommend">

                </div>
            </div>
        </div>
    );
}

async function getImage() {
    const result = await ContentRequest.request('http://89.169.157.210/static/mh_default_org/engage-player/b81613e0-aca8-45d8-99df-baa22967c08c/f8348f18-9d23-4948-bea2-a854d2dfc1e3/a7acab54-87f8-483d-a3af-af94ec5954fb_3.000s-player.jpg');
    return result;
}

export default Stream;
