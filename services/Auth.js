import config from "../config/config.js";

export class Auth {
    static accessTokenKey = 'accessToken';

    static async setToken(flag = true) {
        const token = localStorage.getItem(this.accessTokenKey);
        if (!token || !flag) {
            const response = await fetch(config.hostToken,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json', //отправка
                        'Accept': 'application/json', //получение
                        // 'is_redactor' : true
                    }
                });

            if (response) {
                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem(this.accessTokenKey, result.access_token);
                        return true
                    }
                }
            }
        }
        return false;
    }

    // static setToken(accessToken) {
    //     localStorage.setItem(this.accessTokenKey, accessToken);
    // }
}