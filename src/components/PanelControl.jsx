import "./PanelControl.scss"
import UploadVideo from "./UploadVideo.jsx";
import UploadStream from "./uploadStream.jsx";
import {useMatch} from "react-router-dom";

export default function PanelControl() {
    const match = useMatch('/upload/:page');
    const page = match?.params.page;

    return (
        <div className="panel">
            <div className="panel-nav">
                <div className="panel-nav-user">
                    <img className="panel-nav-user-photo" src="" alt=""/>
                </div>
                <div className="panel-nav-sections">
                    <button className="panel-nav-section">
                        <svg viewBox="0 0 384 512">
                            <path
                                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                        <span>
                            Видео
                        </span>
                    </button>
                    <button className="panel-nav-section">
                        <svg viewBox="0 0 576 512">
                            <path
                                d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>
                        </svg>
                        <span>
                            Трансляции
                        </span>
                    </button>
                    <button className="panel-nav-section">
                        <svg viewBox="0 0 576 512">
                            <path
                                d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm32-128c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM128 384c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z"/>
                        </svg>
                        <span>
                            Плейлисты
                        </span>
                    </button>
                </div>
                <button className="panel-nav-support">Поддержка</button>
            </div>
            <div className="panel-control">
                <h1 className="panel-control-title">Панель управления контентом</h1>
                <div className="panel-control-content">
                    { page === 'video' ? (
                        <>
                            <div className="panel-control-content-sections">
                                <div className="panel-control-content-section">Загруженные видео</div>
                                <div className="panel-control-content-section active">Создать видео</div>
                            </div>
                            <UploadVideo />
                        </>
                    ) : ( page === 'stream' ? (
                        <>
                            <div className="panel-control-content-sections">
                                <div className="panel-control-content-section">Сохраненные трансляции</div>
                                <div className="panel-control-content-section active">Запланировать трансляцию</div>
                            </div>
                            <UploadStream />
                        </>
                    ) : (<>Не удалось загрузить страницу</>))}
                </div>
            </div>
        </div>
    )
}