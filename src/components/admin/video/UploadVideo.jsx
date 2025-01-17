import config from "../../../../config/config.js";
import React, { useState, useEffect } from "react";
import { HttpRequest } from "../../../../services/Http.js";
import Dropzone from "../Dropzone.jsx";
import { useMatch } from "react-router-dom";
import clsx from "clsx";
import { Videos } from "../../../../services/Videos.js";

export function UploadVideo() {
  const [playlists, setPlaylists] = useState([]);
  const [videoFile, setVideoFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Videos.getPlaylists()
    .then(setPlaylists)
    .catch(error => console.log(error))
  }, []); 

  const handleFileSelect = (file) => {
    setVideoFile(file);
    console.log("Выбранный файл:", file);
  };

  const handleSubmit = async (event) => {
    console.log("Видео отправлено для загрузки");
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const videoTitle = formData.get("videoTitle"); 
    const videoDescription = formData.get("description"); 
    const trimVideo = formData.get("trimVideo") === "on"; 
    const archiveVideo = formData.get("archiveVideo") === "on"; 
    const selectedPlaylist = formData.get("playlist"); 
  
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
  
    setIsLoading(true);
    try {
      const result = await uploadVideo(uploadData); 
      console.log("Результат загрузки:", result);
      if (!result) {
        alert("Ошибка при загрузке");
      } else {
        alert("Видео отправлено на загрузку");
      }
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      alert("Ошибка при загрузке:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  

  return (
    <>
    {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl">Загрузка...</div>
        </div>
      )}
      <form className="flex flex-col p-8" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="max-w-[291px] mr-7">
            <Dropzone onFileSelect={handleFileSelect} />
            <div>
              <div className="font-semibold mb-4">Добавить превью (пока не работает)</div>
              <Dropzone />
            </div>
          </div>
          <div className="flex flex-col w-[492px]">
            <input
              name="videoTitle"
              className={clsx("mb-4 border-2 border-gray-400 rounded-lg px-3 py-2 h-10")}
              placeholder="Введите название"
              required
            />
            <textarea
              name="description"
              className={clsx("mb-4 border-2 border-gray-400 rounded-lg px-3 py-2 h-28")}
              placeholder="Введите описание"
            ></textarea>
            <div className="mb-4">
              <input
                type="checkbox"
                id="trimVideo"
                name="trimVideo"
                className="mr-2"
              />
              <label htmlFor="trimVideo">Удалить кадры без звука</label>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="archiveVideo"
                name="archiveVideo"
                className="mr-2"
              />
              <label htmlFor="archiveVideo">Сжать видео (VP9)</label>
            </div>
            <label htmlFor="playlist" className="mb-2 font-medium">
              Добавить в плейлист
            </label>
            <select
              name="playlist"
              id="playlist"
              className="mb-4 border-2 border-gray-400 rounded-lg px-3 py-2"
            >
              <option value="">-- Не выбирать плейлист --</option>
              {playlists.map((playlist) => (
                <option key={playlist.identifier} value={playlist.identifier}>
                  {playlist.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="w-[291px] h-[62px] text-white bg-[#244A9A] rounded-full">
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
