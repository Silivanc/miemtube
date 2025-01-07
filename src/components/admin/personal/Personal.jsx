import React from 'react';
import './Personal.scss';

export function Personal() {
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