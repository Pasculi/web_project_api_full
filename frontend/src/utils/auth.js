class Auth {
  constructor(url) {
    this._url = url;
  }

  userInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  login({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json());
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json());
  }
}

const auth = new Auth("https://api.arounduspasculi.strangled.net");

export default auth;
