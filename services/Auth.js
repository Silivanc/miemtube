import axios from "axios";
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
          Accept: "application/json", //получение
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
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json;
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
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
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

  static async auth(
    username,
    password,
    scope = "",
    client_id = "",
    client_secret = ""
  ) {
    const response = await fetch(config.auth + "authentication", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", //отправка
        Accept: "application/json", //получение
      },
      body: new URLSearchParams({
        grant_type: "password",
        username,
        password,
        scope,
        client_id,
        client_secret,
      }),
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

  static async getUsers() {
    const token = localStorage.getItem(this.accessTokenKey);
    if (token) {
      const response = await fetch(config.auth, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
      }

      return false;
    }
  }

  static async deleteUser(userId) {
    return await axios.delete(config.auth + "takeout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.accessTokenKey)}`,
      },
      params: {
        user_id: userId
      },
    });
  }

  static async addUser(body) {
    return await axios.post(config.auth + "registration", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.accessTokenKey)}`,
      }
    })
  }

  static async getUser(userId) {
    const users = await axios.get(config.auth, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.accessTokenKey)}`,
      }
    })

  
    if (users.data) {
      return users.data.find(user => user.id === userId);
    }

    return null
  }

  static async changeUser(params) {
    console.log(params);
    return await axios.patch(config.auth + params.user_id, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.accessTokenKey)}`,
      },
      params
    })
  }

  // static setToken(accessToken) {
  //     localStorage.setItem(this.accessTokenKey, accessToken);
  // }
}
