import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos.js";

export function UploadedPlaylists({isAdmin}) {
    const [playlist, setPlaylists] = useState([]);
    
        useEffect(() => {
            Videos.getPlaylists()
                .then(setPlaylists)
                .catch((error) => {
                    console.error("Error fetching playlists:", error);
                });
        }, [isAdmin]);

        console.log(playlist);

        return (
            <></>
        )
}