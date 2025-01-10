import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos.js";
import { MediaItem } from "./mediaItem.jsx";
import { Streams } from "../../../../services/Streams.js";

export function MediaItems({ type, amount = 100 }) {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    if (type === "playlists") {
      Videos.getPlaylists(amount)
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
      Streams.getStreams(amount)
        .then((result) => {
          if (result) {
            setMediaItems(result.map(item => {
              let newMediaItem = {...item};
              newMediaItem.identifier = item.id;
              newMediaItem.title = item.name;
              newMediaItem.creator = item.author_username;
              return newMediaItem
            }));
          }
          })
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }
  }, [type, amount]);


  return (
    <>
      {mediaItems.length === 0 ? (
        <div>Данные отсутcтвуют</div>
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
