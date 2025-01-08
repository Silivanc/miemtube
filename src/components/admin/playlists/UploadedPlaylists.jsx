import { useEffect, useState } from "react";
import { Videos } from "../../../../services/Videos.js";
import editIcon from '../../../assets/images/edit.svg'; 
import trashIcon from '../../../assets/images/trash.svg'; 
import linkIcon from '../../../assets/images/link.svg'; 

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
            <div className="p-0 w-full max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-7 items-center bg-gray-100 font-medium text-left p-4 border-none border-gray-300">
                    <span>Название</span>
                </div>
                {playlist.length > 0 ? (
                    playlist.map((playlist, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-4 items-center border-b border-gray-200 p-4 hover:bg-gray-50"
                        >
                            <span>{playlist.title}</span>
                            <div className="flex items-center gap-2">
                                        <button className="w-6 h-6 flex items-center justify-center">
                                            <img src={editIcon} alt="Редактировать" className="w-6 h-6" />
                                        </button>
                                        <button className="w-6 h-6 flex items-center justify-center">
                                            <img src={trashIcon} alt="Удалить" className="w-6 h-6" />   
                                        </button>
                                        <button className="w-6 h-6 flex items-center justify-center"> 
                                            <img src={linkIcon} alt="Ссылка" className="w-6 h-6" /> 
                                        </button> 
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center">Загрузка...</div>
                )}
            </div>
        );
}