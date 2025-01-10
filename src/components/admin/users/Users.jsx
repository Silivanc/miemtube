import React, { useEffect, useState } from 'react';
import { Auth } from '../../../../services/Auth';
import editIcon from '../../../assets/images/edit.svg';
import trashIcon from '../../../assets/images/trash.svg';
import { Popup } from '../Popup';

export function Users() {
    const [users, setUsers] = useState([]); // начальное состояние - пустой массив

    useEffect(() => {
        Auth.getUsers()
            .then((data) => {
                setUsers(data); // присваиваем полученные данные в состояние
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []); // useEffect с пустым массивом зависимостей, запускается только один раз

    return (
        <div className="p-0 w-full max-h-[500px] overflow-y-auto relative">
            <div className="grid grid-cols-3 gap-4 items-center bg-gray-100 font-medium text-left p-4 border-none border-gray-300">
                <span>Имя</span>
                <span>Почта</span>
                <span>Действия</span>
            </div>
            {users.length > 0 ? (
                users.map((user, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-4 items-center border-b border-gray-200 p-4 hover:bg-gray-50"
                    >
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <div className="flex items-center gap-2">
                                    <button className="w-6 h-6 flex items-center justify-center">
                                        <img src={editIcon} alt="Редактировать" className="w-6 h-6" />
                                    </button>
                                    <button className="w-6 h-6 flex items-center justify-center">
                                        <img src={trashIcon} alt="Удалить" className="w-6 h-6" />   
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