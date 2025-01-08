import config from "../../../../config/config.js";
import "./UploadVideo.scss";
import React, { useState, useEffect } from "react";
import { HttpRequest } from "../../../../services/Http.js";
import Dropzone from "./Dropzone.jsx";
import { useMatch } from "react-router-dom";
import clsx from "clsx";
import { Videos } from "../../../../services/Videos.js";

const uploadInfoElementStyles =
  "px-2 py-1 " +
  "mb-3 border-[3px] border-solid border-[#D9D9D9] rounded-[20px]";

export function UploadVideo() {
  const [playlists, setPlaylists] = useState([]);
  const [videoFile, setVideoFile] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  // Функция для получения видео (используем внутри useEffect)
  useEffect(() => {
    Videos.getPlaylists()
    .then(setPlaylists)
    .catch(error => console.log(error))
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

  const handleFileSelect = (file) => {
    setVideoFile(file);
    console.log("Выбранный файл:", file);
  };

  const handleSubmit = async (event) => {
    console.log("Видео отправлено для загрузки");
    event.preventDefault();
  
    // Создаём объект FormData из формы
    const form = event.target;
    const formData = new FormData(form);
  
    // Извлекаем значения чекбоксов, плейлиста и других полей
    const videoTitle = formData.get("videoTitle"); // Название видео
    const videoDescription = formData.get("description"); // Название видео
    const trimVideo = formData.get("trimVideo") === "on"; // Чекбокс "Удалить кадры без звука"
    const archiveVideo = formData.get("archiveVideo") === "on"; // Чекбокс "Сжать видео"
    const selectedPlaylist = formData.get("playlist"); // Выбранный плейлист (ID)
  
    const metadata = JSON.stringify([
      {
        flavor: "dublincore/episode",
        fields: [
          { id: "title", value: videoTitle },
          { id: "description", value: videoDescription},
          { id: "publisher", value: "Admin" },
          { id: "isPartOf", value: selectedPlaylist},
        ],
      },
    ]);
  
    const processing = JSON.stringify({
      workflow: "academic-processing",
      configuration: {
        publish: "true",
        archive: archiveVideo ? "true" : "false",
        trim: trimVideo ? "true" : "false",
        transcribe: "false",
      },
    });
  
    const acl = JSON.stringify([
      { action: "read", role: "ROLE_ADMIN" },
      { action: "write", role: "ROLE_ADMIN" },
      { action: "read", role: "ROLE_USER" },
      { action: "read", role: "ROLE_ANONYMOUS" },
      { action: "read", role: "ROLE_JWT_REDACTOR_ADMIN" },
      { action: "write", role: "ROLE_JWT_REDACTOR_ADMIN" },
    ]);
  
    const uploadData = new FormData();
    uploadData.append("metadata", metadata);
    uploadData.append("presenter", videoFile);
    uploadData.append("processing", processing);
    uploadData.append("acl", acl);
  
    try {
      const result = await uploadVideo(uploadData); // Отправляем данные
      console.log("Результат загрузки:", result);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };
  

  return (
    <>
      <form className="upload-form flex flex-col" onSubmit={handleSubmit}>
  <div className="flex">
    <div className="upload-content">
      <Dropzone onFileSelect={handleFileSelect} />
      <div className="">
        <div className="font-semibold mb-4">Добавить превью</div>
        <Dropzone />
      </div>
    </div>
    <div className="upload-info">
      <input
        name="videoTitle" // Добавлен атрибут name
        className={clsx(uploadInfoElementStyles, "h-10 mb-4")}
        placeholder="Введите название"
      />
      <textarea
        name="description" // Дополнительное поле, если нужно
        className={clsx("h-28 -mt-1", uploadInfoElementStyles)}
        placeholder="Введите описание"
      ></textarea>
      <div>
        <input
          type="checkbox"
          id="trimVideo"
          name="trimVideo" // Уникальное имя для чекбокса
          className="upload-info-checkbox upload-info-element"
        />
        <label htmlFor="trimVideo">Удалить кадры без звука</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="archiveVideo"
          name="archiveVideo" // Уникальное имя для чекбокса
          className="upload-info-checkbox upload-info-element"
        />
        <label htmlFor="archiveVideo">Сжать видео (VP9)</label>
      </div>
      <label htmlFor="playlist" className="mb-2">
        Добавить в плейлист
      </label>
      <select name="playlist" id="playlist" className="upload-info-element">
        <option value="">-- Не выбирать плейлист --</option>
        {playlists.map((playlist) => (
          <option key={playlist.identifier} value={playlist.identifier}>
            {playlist.title}
          </option>
        ))}
      </select>
    </div>
  </div>
  <button className="w-[291px] h-[62px] text-white rounded-full bg-[#244A9A] ">
    Загрузить
  </button>
</form>
    </>
  );
}

async function uploadVideo(body) {
  const result = await HttpRequest.request(
    config.host + "events",
    "POST",
    body,
    true
  );
  return result;
}
