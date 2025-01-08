import { useEffect, useState } from "react"
import { Videos } from "../../../../services/Videos";

export function UploadedVideo({isAdmin}) {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        Videos.getVideos()
                .then(setVideos)
                .catch((error) => {
                  console.error("Error fetching playlists:", error);
                });
    }, [isAdmin])

    console.log(videos);

    return (
        <>133</>
    )
}