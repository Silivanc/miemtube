import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos.js";
import { MediaItem } from "./mediaItem.jsx";
import { Streams } from "../../../../services/Streams.js";

export function MediaItems({ type, length = 100, status = "" }) {
  const [mediaItems, setMediaItems] = useState([]);
  useEffect(() => {
    if (type === "playlists") {
      Videos.getPlaylists(length)
        .then(setMediaItems)
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }

    if (type === "videos") {
      Videos.getVideosWithFullInfo()
        .then(setMediaItems)
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }

    if (type === "streams") {
      Streams.getStreams(length, status)
        .then((result) => {
          if (result) {
            const newMediaItems = result.map(item => {
              let newMediaItem = {...item};
              newMediaItem.identifier = item.id;
              newMediaItem.title = item.name;
              newMediaItem.creator = item.author_username;
              return newMediaItem
            })
            setMediaItems(newMediaItems);
          }
          })
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }
  }, [type, length]);


  return (
    <>
      {mediaItems.length === 0 ? (
        <div>Нет данных</div>
      ) : (
        <div className="grid grid-cols-4 justify-items-center">
          {mediaItems.map((item, index) => {
            return <MediaItem item={item} type={type} key={index}></MediaItem>;
          })}
        </div>
      )}
    </>
  );
}
