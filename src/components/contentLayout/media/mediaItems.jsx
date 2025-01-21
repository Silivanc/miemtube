import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos.js";
import { MediaItem } from "./mediaItem.jsx";
import { Streams } from "../../../../services/Streams.js";

export function MediaItems({ type, length = 100, status = "", search = ""}) {
  const [mediaItems, setMediaItems] = useState([]);
  useEffect(() => {
    if (type === "playlists") {
      Videos.getPlaylists(length, search)
        .then(setMediaItems)
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }

    if (type === "videos") {
      Videos.getVideosWithFullInfo(length, search)
        .then(setMediaItems)
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }

    if (type === "streams") {
      Streams.getStreams(length, status, search)
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
  }, [type, length, search]);


  return (
    <>
      {mediaItems.length === 0 ? (
        <div className="mb-3">Нет данных</div>
      ) : (
        <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 gap-4 mx-4">
          {mediaItems.map((item, index) => {
            return <MediaItem item={item} type={type} key={index}></MediaItem>;
          })}
        </div>
      )}
    </>
  );
}
