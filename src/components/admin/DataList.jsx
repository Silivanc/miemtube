import { useState } from "react";
import editIcon from "../../assets/images/edit.svg";
import trashIcon from "../../assets/images/trash.svg";
import { PopupDelete } from "./ui/Popup-delete";
import { useSearchParams } from "react-router-dom";

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
    <div className="p-0 w-full max-h-[500px] overflow-y-auto relative">
      <div className="grid grid-cols-4 gap-4 items-center bg-gray-100 font-medium text-left p-4 border-none border-gray-300">
        <span>Username</span>
        <span>Имя</span>
        <span>Почта</span>
        <span>Действия</span>
      </div>
      
      {Array.isArray(data) > 0 ? (
        <>
          {data.map((element, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              {Object.entries(element).map((elementData, index) => (
                  elementData[0] !== 'id' && <span key={index}>{elementData[1]}</span>
              ))}
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
    </div>
  );
}
