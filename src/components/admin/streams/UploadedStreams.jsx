import { useEffect, useState } from "react";
import { Streams } from "../../../../services/Streams.js";
import editIcon from "../../../assets/images/edit.svg";
import trashIcon from "../../../assets/images/trash.svg";
import linkIcon from "../../../assets/images/link.svg";
import { DataList } from "../DataList.jsx";

export function UploadedStreams({ isAdmin }) {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    Streams.getStreams()
      .then((streams) => {
        setStreams(
          streams.map((stream) => {
            let newStream = {};
            newStream.name = stream.name;
            newStream.author_username = stream.author_username;
            newStream.stream_source_profile_id =
              stream.stream_source_profile_id ?? stream.stream_source_url;
            newStream.start_time = stream.start_time.split(".")[0];
            newStream.end_time = stream.end_time.split(".")[0];
            newStream.is_captured = stream.is_captured ? "Да" : "Нет";
            newStream.stream_status = stream.stream_status;
            newStream.id = stream.id;

            return newStream;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, [isAdmin]);

  return (
    <div className="p-0 w-full max-h-[500px] overflow-y-auto">
      <div className="grid grid-cols-8 gap-4 items-center bg-gray-100 font-medium text-left p-4 border-b border-gray-300">
        <span>Название</span>
        <span>Автор</span>
        <span>Источник</span>
        <span>Старт</span>
        <span>Окончание</span>
        <span>Запись</span>
        <span>Статус</span>
        <span>Действия</span>
      </div>

      <DataList data={streams} />
    </div>
  );
}
