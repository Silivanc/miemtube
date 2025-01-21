import React, { useEffect, useState } from "react";
import "./Player.scss";
import { useParams } from "react-router-dom";
import { Streams } from "../../services/Streams.js";
import { formatDateTime } from "../../utils/formatDateTime.js";

export default function Stream() {
  const [stream, setStream] = useState({});
  const { streamId } = useParams();

  useEffect(() => {
    Streams.getStream(streamId)
      .then((result) => {
        if (result) {
            
          let newStream = { ...result };
          const startTime = formatDateTime(result.start_time);
          newStream.startTime = startTime;
          if (result.stream_status === "CREATED") {
            newStream.message = `Трансляция начнётся ${startTime.date} в ${startTime.time} по МСК`;
          } else if (result.stream_status === "FINISHED") {
            const endTime = formatDateTime(result.end_time);
            newStream.message = `Трансляция завершилась ${endTime.date} в ${endTime.time} по МСК`;
          }
          setStream(newStream);
        } else {
            setStream({message: "Не удалелось загрузить трансляцию"})
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container pt-4 flex flex-col">
      <div className="flex flex-wrap justify-start">
        <div className="flex-grow max-w-[899px] mr-4">
          {stream?.message ? (
            <div className="w-full bg-black text-white flex justify-center items-center aspect-video mb-3 rounded-xl">
              {stream?.message}
            </div>
          ) : (
            <video
              src={"http://172.18.130.56:8095/api/stream.mp4?src=" + stream.id}
              controls
              autoPlay
            ></video>
          )}

          <div className="text-2xl font-semibold mb-1">{stream.name}</div>
          <div className="flex justify-between items-center text-base mb-6">
            <div className="flex items-center">
              <div className="mr-4 font-semibold">{stream.author_username}</div>
            </div>
            <div className="flex items-center">
              <svg
                className="mr-2"
                viewBox="0 0 448 512"
                width="16"
                height="16"
              >
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
              </svg>
              <span>{stream?.startTime?.date}</span>
            </div>
          </div>
          <div className="player-main-description mb-8">
                        {stream.description}
                    </div>
        </div>
      </div>
    </div>
  );
}