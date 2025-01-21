import { useState } from "react";
import editIcon from "../../assets/images/edit.svg";
import trashIcon from "../../assets/images/trash.svg";
import { PopupDelete } from "./ui/Popup-delete";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

export function DataList({ data, deleteElement, setActiveIndex }) {
  const [display, setDisplay] = useState("hidden");
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteElementHandler = async () => {
    const res = await deleteElement(selectedElement);
    if (res) {
      setDisplay("hidden");
    } else {
      alert("Что-то пошло не так");
    }
  };

  return (
    <>
      {Array.isArray(data) > 0 ? (
        <>
          {data.map((element, index) => (
            <div
              key={index}
              className={clsx(
                "grid gap-3 items-center border-b border-gray-200 p-4 hover:bg-gray-50",
                "grid-cols-" + Object.entries(element).length
              )}
            >
              {Object.entries(element).map(
                (elementData, index) =>
                  elementData[0] !== "id" && (
                    // <span key={index} className="line-clamp-2 text-ellipsis">{elementData[1]}</span>
                    <div key={index} className="relative group">
                      <span key="truncated-text" className="line-clamp-2">
                        {elementData[1]}
                      </span>
                      <span className="absolute left-0 top-full mt-1 bg-gray-900 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        {elementData[1]}
                      </span>
                    </div>
                  )
              )}
              <div className="flex items-center gap-2">
                <button
                  className="w-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    setSearchParams({ id: element?.id });
                    setActiveIndex(1);
                  }}
                >
                  <img src={editIcon} alt="Редактировать" className="w-6 h-6" />
                </button>
                <button
                  className="w-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    setDisplay("");
                    setSelectedElement(element.id);
                  }}
                >
                  <img src={trashIcon} alt="Удалить" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
          <PopupDelete
            display={display}
            setDisplay={setDisplay}
            deleteObject={deleteElementHandler}
          />
        </>
      ) : (
        <div className="p-4 text-center">Загрузка...</div>
      )}
    </>
  );
}
