import { useEffect, useState } from "react"; 
import { Streams } from "../../../../services/Streams.js"; 
import editIcon from '../../../assets/images/edit.svg'; 
import trashIcon from '../../../assets/images/trash.svg'; 
import linkIcon from '../../../assets/images/link.svg'; 
 
export function UploadedStreams({isAdmin}) { 
    const [streams, setStreams] = useState([]); 
     
        useEffect(() => { 
            Streams.getStreams() 
                .then(
                    setStreams
                ) 
                .catch((error) => { 
                    console.error("Error fetching playlists:", error); 
                }); 
        }, [isAdmin]); 
 
        console.log(streams); 
 
        return ( 
            <div className="p-0 w-full max-h-[500px] overflow-y-auto"> {/* Прокрутка по вертикали */} 
                
                {/* Заголовок */} 
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
     
                {/* Данные видео */} 
                {streams.length > 0 ? ( 
                    streams.map((stream, index) => ( 
                        <div 
                            key={index} 
                            className="grid grid-cols-8 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50" 
                        > 
                            <span>{stream.name}</span> 
                            <span>{stream.author_username}</span> 
                            <span>{stream.stream_source_profile_id ?? stream.stream_source_url}</span> 
                            <span>{stream.start_time.split('.')[0]}</span> 
                            <span>{stream.end_time.split('.')[0]}</span> 
                            <span>{stream.is_captured ? "Да" : "Нет"}</span> 
                            <span>{stream.stream_status}</span> 
                            <div className="flex gap-2"> 
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
                    <div className="p-4 text-center border-b border-gray-200">Загрузка...</div> 
                )} 
            </div> 
        ); 
}