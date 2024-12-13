import config from "../../config/config.js";
import "./UploadVideo.scss"
import React, {useState, useEffect} from 'react';
import {HttpRequest} from "../../services/Http.js";
import Dropzone from "./Dropzone.jsx";
import {useMatch} from "react-router-dom";
import clsx from "clsx";

const uploadInfoElementStyles = "px-2 py-1 " +
    "mb-3 border-[3px] border-solid border-[#D9D9D9] rounded-[20px]"

export default function UploadVideo() {

    const match = useMatch('/upload:page');
    const page = match?.params.page

    const [playlists, setPlaylists] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoPlaylist, setVideoPlaylist] = useState("");
    // Функция для получения видео (используем внутри useEffect)
    useEffect(() => {
        async function fetchVideo() {
            try {
                const result = await getPlaylists();  // Ждем асинхронный запрос
                setPlaylists(result);  // Обновляем состояние с результатом
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        }

        fetchVideo();  // Вызываем асинхронную функцию при монтировании компонента
    }, []);  // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    const handleFileSelect = (file) => {
        setVideoFile(file);
        console.log("Выбранный файл:", file);
    };

    // Обработка отправки формы
    const handleSubmit = async (event) => {

        console.log('Видео отправлено для загрузки');
        event.preventDefault();

        const metadata = `[
          {
            "flavor": "dublincore/episode",
            "fields": [
              {
                "id": "title",
                "value": ${videoTitle}
              },
              {
                "id": "publisher",
                "value": "Admin"
              },
            ]
          }
        ]`

        const formData = new FormData();
        formData.append("metadata", metadata);
        formData.append("presenter", videoFile);
        formData.append("processing", `{
          "workflow": "fast-testing-workflow",
          "configuration": {
            "flagForCutting": "false",
            "flagForReview": "false",
            "publishToEngage": "true",
            "publishToHarvesting": "true",
            "straightToPublishing": "true"
          }
        }`);
                formData.append("acl",
                    `[
          {
            "action": "write",
            "role": "ROLE_ADMIN"
          },
          {
            "action": "read",
            "role": "ROLE_USER"
          }
        ]`);
        // formData.append("workflow-id", "lecture-process-with-include");
        const result = await uploadVideo(formData); // Отправляем данные
        console.log(result);
    };

    return (
        <>
            <form className="upload-form flex flex-col" onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="upload-content">
                        <Dropzone onFileSelect={handleFileSelect}/>
                        <div className="">
                            <div className="font-semibold mb-4">Добавить превью</div>
                            <Dropzone/>
                        </div>
                    </div>
                    <div className="upload-info">
                        <input className={clsx(uploadInfoElementStyles, "h-10 mb-4")} placeholder='Введите название'
                               value={videoTitle}
                               onChange={(e) => setVideoTitle(e.target.value)}/>
                        <textarea className={clsx("h-28 -mt-1", uploadInfoElementStyles)}
                                  placeholder='Введите описание'></textarea>
                        <div>
                            <input type="checkbox" className="upload-info-checkbox upload-info-element"
                                   id="upload-video-checkbox"/>
                            <label htmlFor="upload-video-checkbox">Удалить кадры без звука</label>
                        </div>
                        <label htmlFor="" className="mb-2">Добавить в плейлист</label>
                        <select name="city" id="city-select" className="upload-info-element">
                            <option value="" defaultValue>-- Не выбирать плейлист --</option>
                            <option value="petersburg">Элитный плейлист</option>
                        </select>
                    </div>
                </div>
                <button className="w-[291px] h-[62px] text-white rounded-full bg-[#244A9A] ">Отправить</button>
            </form>
        </>

        // <form className="panel-control-content-form" onSubmit={handleSubmit}>

        //     <div className="panel-control-content-settings">
        //         <input type="text" name="title" id="videoTitle" placeholder="Введите название"
        //                value={videoTitle}
        //                onChange={(e) => setVideoTitle(e.target.value)}/>
        //         <input type="checkbox" id="videoSilence"/>
        //         <label htmlFor="videoSilence">Удалить кадры без звука</label>
        //     </div>
        //     <div className="panel-control-content-data">
        //         <div className="panel-control-content-data-title">Данные видео</div>
        //         <div className="panel-control-content-data-duration">Данные видео</div>
        //         <div className="panel-control-content-data-size">Данные видео</div>
        //     </div>
        //     <div>
        //         <label htmlFor={videoPlaylist}>Добавить в плейлист</label>
        //         <select name="playlist" id="videoPlaylist"
        //                 value={videoPlaylist}
        //                 onChange={(e) => setVideoPlaylist(e.target.value)}>
        //             <option value="" defaultValue>Выбрать плейлист</option>
        //             {playlists.length === 0 ? (
        //                 <option value=""></option>
        //             ) : (
        //                 playlists.map((playlist, index) =>
        //                     <option key={index} value={playlist.identifier}>{playlist.title}</option>
        //                 )
        //             )}
        //         </select>
        //     </div>
        //     <button className="panel-control-content-button">Загрузить</button>
        // </form>
    )
}

async function getPlaylists() {
    const playlists = await HttpRequest.request(config.host + 'series');
    console.log(playlists);
    return playlists;
}

async function uploadVideo(body) {
    const result = await HttpRequest.request(config.host + 'events', "POST", body);
    return result;
}