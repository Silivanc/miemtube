import {Auth} from "./Auth.js";

export class ContentRequest {
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

        let token = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['Authorization'] = 'Bearer ' + token;
        } else {
            Auth.setToken();
        }

        if (body) {
            params.body = body;
        }
        const response = await fetch(url, params);

        if (response.status >= 200 && response.status < 300) {
            try {
                const result = response.body.getReader();
                return await result;
            } catch {
                const tokenResult = Auth.setToken(false);
                if (tokenResult) {
                    HttpRequest.request(url, method, body);
                }
            }
        }
        return false;
    }
}