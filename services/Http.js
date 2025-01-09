import {Auth} from "./Auth.js";
import config from "../config/config.js";

export class HttpRequest {
    static async request(url, method = 'GET', body = null, requireToken = false){
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

        let token;
        if (requireToken) {
            token = localStorage.getItem(Auth.accessTokenKey);

            if (token) {
                params.headers['Authorization'] = 'Bearer ' + token;
            } else {
                Auth.setToken();
            }
        }

        if (body) {
            if (body instanceof FormData) {
                params.body = body;
            } else {
                params.body = JSON.stringify(body);
            }
            
        }
        const response = await fetch(url, params);

        // if (response.status < 200 || response.status > 300) {
        //     const result = await Auth.processUnauthorizedResponse();
        //     if (response.status === 401) {
        //         const result = await Auth.processUnauthorizedResponse();
        //         if (result) {
        //             return await this.request(url, method, body)
        //         } else {
        //             return null;
        //         }
        //     }
        //
        //     throw new Error(response.message);
        // }

        if (response.status >= 200 && response.status < 300) {
            try {
                const result = response.json();
                return await result;
            } catch {
                if (requireToken) {
                    const tokenResult = Auth.setToken(false);
                    if (tokenResult) {
                        HttpRequest.request(url, method, body, requireToken);
                    }
                }
            }
        }

        return false;
    }
}