import config from "../config/config.js";

export class Auth {
  static accessTokenKey = "accessToken";

  static async setToken(flag = true) {
    const token = localStorage.getItem(this.accessTokenKey);
    if (!token || !flag) {
      const response = await fetch(config.hostToken, {
        method: "GET",
        headers: {
          "Content-type": "application/json", //отправка
          "Accept": "application/json", //получение
        },
      });

      if (response) {
        if (response && response.status === 200) {
          const result = await response.json();
          if (result && !result.error) {
            localStorage.setItem(this.accessTokenKey, result.access_token);
            return true;
          }
        }
      }
    }
    return false;
  }

  static async checkMe() {
    const token = localStorage.getItem(this.accessTokenKey);
    if (token) {
      const response = await fetch(config.auth + "me", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + token
        }
      });

      if (response) {
        if (response.status >= 200 && response.status < 300) {
          return true;
        }
      }

      return false;
    }
  }

  static async checkUser() {
    const token = localStorage.getItem(this.accessTokenKey);
    if (token) {
      const response = await fetch(config.auth + "?limit=10", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + token
        }
      });

      if (response) {
        if (response.status >= 200 && response.status < 300) {
            console.log(response.json);
          return true;
        }
      }

      return false;
    }
  }

  static async auth(username, password, scope = "", client_id = "", client_secret = "") {
    const response = await fetch(config.auth + 'authentication', {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", //отправка
        "Accept": "application/json", //получение
      },
      body: new URLSearchParams({
        grant_type: "password",
        username,
        password,
        scope,
        client_id,
        client_secret
      })
    });

    if (response) {
      if (response && response.status === 200) {
        const result = await response.json();
        if (result && !result.error) {
          localStorage.setItem(this.accessTokenKey, result.access_token);
          return true;
        }
      }
    }

    return false;
  }

  // static setToken(accessToken) {
  //     localStorage.setItem(this.accessTokenKey, accessToken);
  // }
}
