import React, { useEffect, useState } from 'react';
import { Auth } from '../../../../services/Auth';

export function Personal() {
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
        <div className="p-0"> {/* Отступы вокруг таблицы */}
            <table className="w-full border-none border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="p-4 border-b-2 border-gray-300 text-left">Имя</th>
                        <th className="p-4 border-b-2 border-gray-300 text-left">Почта</th>
                        <th className="p-4 border-b-2 border-gray-300 text-left">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-4 border-b border-gray-200">{user.name}</td>
                                <td className="p-4 border-b border-gray-200">{user.email}</td>
                                <td className="p-4 border-b border-gray-200">
                                    <button
                                        className="w-6 h- bg-no-repeat bg-center bg-contain cursor-pointer"
                                        style={{ backgroundImage: "url('edit.svg')" }}
                                    />
                                    <button
                                        className="w-6 h-6 bg-no-repeat bg-center bg-contain cursor-pointer"
                                        style={{ backgroundImage: "url('trash.svg')" }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-3 text-center">Загрузка...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}