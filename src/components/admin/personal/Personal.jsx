import React, { useEffect, useState } from 'react';
import './Personal.scss';
import { Auth } from '../../../../services/Auth';

export function Personal() {
    const [users, setUsers] = useState();
    
        useEffect(() => {
            Auth.getUsers()
                .then(setUsers)
                .catch(error =>
                    console.error("Error fetching video:", error))
        }, [])

    console.log(users);
    return (
        <div>
            <table>
            <thead>
                <tr>
                <th>        </th>
                <th>Имя</th>
                <th>Дата регистрации</th>
                <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><button class="account-user"></button></td>
                <td>Фамилия Имя</td>
                <td>21 фев. 2015 г.</td>
                <td>
                    <button class="edit-user"></button>
                    <button class="trash-user"></button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}