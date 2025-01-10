import { useEffect, useState } from "react";
import { Streams } from "../../../../services/Streams";
import Dropzone from "../Dropzone.jsx";
import clsx from "clsx";

const sharedInputStyles = "mb-4 border-2 border-gray-400 rounded-lg px-2 py-2";

export function CreateStream() {
  const [profiles, setProfiles] = useState([]);
  const [isCustomSource, setIsCustomSource] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Streams.getProfiles()
      .then(setProfiles)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSourceChange = (event) => {
    setIsCustomSource(event.target.value === "custom");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");
    const startTime = new Date(formData.get("start_time"));
    const endTime = new Date(formData.get("end_time"));
    const isCaptured = formData.get("is_captured") === "on";
    const streamSourceUrl = formData.get("stream_source") != 'custom' ? formData.get("stream_source") : formData.get("stream_source_url");

    const payload = {
      name,
      description,
      author_username: "admin",
      stream_source_url: streamSourceUrl,
      start_time: startTime,
      end_time: endTime,
      is_captured: isCaptured,
    };

    console.log("Form submitted:", payload);

    setIsLoading(true);
    try {
      const result = await Streams.planStream(payload); 
      console.log("Результат загрузки:", result);
      if (!result) {
        alert("Ошибка при загрузке");
      } else {
        alert("Трансляция успешно запланирована");
      }
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      alert("Ошибка при загрузке:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form className="flex flex-col p-8" onSubmit={handleSubmit}>
      <div className="flex mb-4">
      <div className="max-w-[291px] mr-7">
        <div className="mb-4">
          <div className="font-semibold mb-4">Превью трансляции (пока не работает)</div>
          <Dropzone />
        </div>
        <div>
          <div className="mb-2">Время трансляции</div>
          <div className="mb-4">
            <label className="block mb-1">Начало</label>
            <input
              type="datetime-local"
              name="start_time"
              className="w-full border border-gray-400 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Конец</label>
            <input
              type="datetime-local"
              name="end_time"
              className="w-full border border-gray-400 rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[492px]">
        <input
          name="name"
          className={clsx(sharedInputStyles, "h-10")}
          placeholder="Введите название"
          required
        />
        <textarea
          name="description"
          className={clsx(sharedInputStyles, "h-28")}
          placeholder="Введите описание"
        ></textarea>
        <label className="mb-2 font-medium">
          Выберите источник
        </label>
        <select
          name="stream_source"
          className={sharedInputStyles}
          onChange={handleSourceChange}
        >
          <option disabled>
            Выберете источник трансляции
          </option>
          <option value="custom">Свой источник</option>
          {profiles.map(profile => {
            return <option key={profile.id} value={profile.source}>{profile.name}</option>
          })}
        </select>
        {isCustomSource && (
          <input
            name="stream_source_url"
            className={sharedInputStyles}
            placeholder="rtmp://stream-source/live/stream"
          />
        )}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="is_captured"
            name="is_captured"
            className="mr-2"
          />
          <label htmlFor="is_captured">Записать трансляцию</label>
        </div>
      </div>
      </div>
      <button
        type="submit"
        className="px-6 py-3 w-[295px] bg-blue-600 text-white rounded-full mt-auto"
      >
        Запланировать трансляцию
      </button>
    </form>
  );
}
