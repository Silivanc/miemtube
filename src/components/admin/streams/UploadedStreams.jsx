import { useEffect, useState } from "react";
import { Streams } from "../../../../services/Stream.js";

export function UploadedStreams({isAdmin}) {
    const [streams, setStreams] = useState([]);
    
        useEffect(() => {
            Streams.getStreams()
                .then(setStreams)
                .catch((error) => {
                    console.error("Error fetching playlists:", error);
                });
        }, [isAdmin]);

        console.log(streams);

        return (
            <></>
        )
}