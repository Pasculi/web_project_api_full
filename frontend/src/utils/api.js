class Api {
  constructor(url, token) {
    this._url = url;
    this._token = `Bearer ${token}`;
  }

  setToken(token) {
    this._token = `Bearer ${token}`;
  }

  _methodHeaders(endpoint, method = "GET", bodyData = null) {
    const options = {
      method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    };

    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    return fetch(`${this._url}${endpoint}`, options).then((response) =>
      response.json()
    );
  }

  getUserInfo() {
    return this._methodHeaders(`/users/me`);
  }

  updateUser({ name, about }) {
    return this._methodHeaders(`/users/me`, "PATCH", { name, about });
  }

  updateAvatar(avatar) {
    return this._methodHeaders(`/users/me/avatar`, "PATCH", { avatar });
  }

  getInitialCards() {
    return this._methodHeaders(`/cards`);
  }

  addCard({ name, link }) {
    return this._methodHeaders(`/cards`, "POST", { name, link });
  }

  deleteCard(idCard) {
    return this._methodHeaders(`/cards/${idCard}`, "DELETE");
  }

  likeCard(idCard, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._methodHeaders(`/cards/likes/${idCard}`, method);
  }

  deleteLikeCard(idCard) {
    return this._methodHeaders(`/cards/likes/${idCard}`, "DELETE");
  }
}

const api = new Api(
  "https://api.arounduspasculi.strangled.net",
  "962f1eb6-c335-46ac-b3a5-7d22c2a5fd9a"
);

export default api;
