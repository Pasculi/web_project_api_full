class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  setToken(token) {
    this._token = `Bearer ${token}`;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  updateUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((response) => response.json());
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((response) => response.json());
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        link,
        name,
      }),
    }).then((response) => response.json());
  }
  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }

  likeCard(idCard, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: method,
    }).then((response) => response.json());
  }
  
  deleteLikeCard(idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }
}


const api = new Api(
  "http://localhost:5000",
  "962f1eb6-c335-46ac-b3a5-7d22c2a5fd9a"
);

export default api;