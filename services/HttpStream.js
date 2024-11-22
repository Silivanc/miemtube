import {Auth} from "./Auth.js";

export class HttpStream {
    static async request(url, method = 'GET', body = null){
        const params = {
            method: method,
        }

        if (body instanceof FormData) {

            params.headers = {
                'Accept': 'application/json', //получение
            }
        } else {
            params.headers = {
                'Content-type': 'application/json', //отправка
                'Accept': '*/*', //получение
            }
        }

        let token = localStorage.getItem('accessTokenStream');
        if (token) {
            params.headers['Authorization'] = 'Bearer ' + token;
        }

        if (body) {
            params.body = body;
        }
        const response = await fetch(url, params);

        if (response.status >= 200 && response.status < 300) {
            try {
                const result = response.json();
                return await result;
            } catch {
                throw new Error("Ошибка с токеном стрима");
            }
        }

        return false;
    }
}