import Dropzone from "./Dropzone.jsx";
import React, {useState} from "react";
import './UploadVideo.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UploadStream() {

    const [videoFile, setVideoFile] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    return (
        <form className="upload-form" >
            <div className="upload-content">
                <div className="upload-content-preview">
                    <div className="upload-content-preview-text">Обложка трансляции</div>
                    <Dropzone/>
                </div>
                <div>Время трансляции</div>
                Начало<input type="datetime-local"/>
                <div></div>
                Конец<input type="datetime-local"/>
            </div>
            <div className="upload-info">
                <input className="upload-info-title upload-info-element" placeholder='Введите название'/>
                <textarea className="upload-info-description upload-info-element" placeholder='Введите описание'></textarea>
                <label htmlFor="">Настройка программы для трансляции</label>
                <select name="city" id="city-select" className="upload-info-element">
                    <option value="" disabled selected>Выберете источник трансляции</option>
                    <option value="petersburg">Сервер 1</option>
                    <option value="samara">Сервер 2</option>
                </select>
                <input className="upload-info-element" placeholder='Введите адрес'/>
            </div>
            <button style={{}}>Запланировать трансляцию</button>
        </form>
    )
}