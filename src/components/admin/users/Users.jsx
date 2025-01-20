import React, { useEffect, useState } from "react";
import { Auth } from "../../../../services/Auth";
import editIcon from "../../../assets/images/edit.svg";
import trashIcon from "../../../assets/images/trash.svg";
import { Popup } from "../ui/Popup-delete";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export function Users({setActiveIndex}) {
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("hidden");
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    Auth.getUsers()
      .then((data) => {
        setUsers(data); // присваиваем полученные данные в состояние
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [display]); // useEffect с пустым массивом зависимостей, запускается только один раз

  const deleteUser = async () => {
    const res = await Auth.deleteUser(selectedUserId);
    if (res) {
        setDisplay("hidden");
    } else {
        alert("Что-то пошло не так");
    }
  }

  return (
    <div className="p-0 w-full max-h-[500px] overflow-y-auto relative">
      <div className="grid grid-cols-4 gap-4 items-center bg-gray-100 font-medium text-left p-4 border-none border-gray-300">
        <span>Username</span>
        <span>Имя</span>
        <span>Почта</span>
        <span>Действия</span>
      </div>
      {users.length > 0 ? (
        <>
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <span>{user.username}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 flex items-center justify-center"
                onClick={() => {
                  setSearchParams({'userId': user.id})
                  setActiveIndex(1);
                }}
                >
                  <img src={editIcon} alt="Редактировать" className="w-6 h-6" />
                </button>
                <button className="w-6 h-6 flex items-center justify-center"
                onClick={() => {
                    setDisplay("");
                    setSelectedUserId(user.id);
                    }}>
                  <img src={trashIcon} alt="Удалить" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
          <Popup display={display} setDisplay={setDisplay} deleteObject={deleteUser}/>
        </>
      ) : (
        <div className="p-4 text-center">Загрузка...</div>
      )}
    </div>
  );
}
