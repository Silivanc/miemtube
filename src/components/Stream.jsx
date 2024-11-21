import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function Stream() {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Исходный URL для получения плейлиста
    //     const streamUrl = 'http://localhost:1984/api/stream.m3u8?src=str&mp4';
    //
    //     // Запрашиваем плейлист
    //     fetch(streamUrl)
    //         .then(response => response.text())
    //         .then(data => {
    //             // Парсим ответ и извлекаем ссылку на HLS плейлист
    //             const hlsPlaylistUrlMatch = data.match(/hls\/playlist\.m3u8\?id=[\w-]+/);
    //             if (hlsPlaylistUrlMatch) {
    //                 const hlsPlaylistUrl = `http://localhost:1984/api/${hlsPlaylistUrlMatch[0]}`;
    //
    //                 // Воспроизведение HLS через hls.js
    //                 if (Hls.isSupported()) {
    //                     const hls = new Hls();
    //                     hls.loadSource(hlsPlaylistUrl);
    //                     hls.attachMedia(videoRef.current);
    //
    //                     hls.on(Hls.Events.ERROR, (event, data) => {
    //                         if (data.fatal) {
    //                             switch (data.type) {
    //                                 case Hls.ErrorTypes.NETWORK_ERROR:
    //                                     setError('Проблема с сетью при загрузке HLS.');
    //                                     hls.startLoad();
    //                                     break;
    //                                 case Hls.ErrorTypes.MEDIA_ERROR:
    //                                     setError('Проблема с медиа-ресурсом.');
    //                                     hls.recoverMediaError();
    //                                     break;
    //                                 default:
    //                                     setError('Не удалось загрузить видео.');
    //                                     hls.destroy();
    //                                     break;
    //                             }
    //                         }
    //                     });
    //                 } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
    //                     videoRef.current.src = hlsPlaylistUrl;
    //                 } else {
    //                     setError('Ваш браузер не поддерживает HLS.');
    //                 }
    //             } else {
    //                 setError('Не удалось получить ссылку на HLS плейлист.');
    //             }
    //         })
    //         .catch(err => setError(`Ошибка: ${err.message}`));
    //
    // }, []);

    return (
        <div>
            {error ? (
                <p style={{ color: 'red' }}>Ошибка: {error}</p>
            ) : (
                // <video src="http://localhost:1984/api/stream.mjpeg?src=str" controls style={{ width: '100%', maxWidth: '600px' }} />
                <video src="http://localhost:80/api/stream.mp4?src=da18a155-d01d-4194-a0da-abf2c3c25ff7" autoPlay style={{ width: '100%', maxWidth: '600px' }}/>
                )}
        </div>
    );
}

export default Stream;
