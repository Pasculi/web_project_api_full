class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;

  }
  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      { headers: this._headers }
    )
      .then(this.handleResponse)
      .catch(error => console.error('Error al obtener las cards:', error));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      { headers: this._headers }
    )
      .then(this.handleResponse)
      .catch(error => console.error('Error al obtener la información del usuario:', error));
  }
  updateUser({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers:
        this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al actualizar al usuario', error));

  }
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers:
        this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al actualizar al avatar:', error));
  }
  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al añadir una tarjeta:', error));

  }
  deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      headers: this._headers,
      method: 'DELETE',
      body: JSON.stringify({
        idCard
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al eliminar una tarjeta:', error));

  }
  likeCard(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: method,
      body: JSON.stringify({
        id
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al dar like a la tarjeta:', error));
  }
  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: 'DELETE',
      body: JSON.stringify({
        id
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error al quitar like a la tarjeta', error));
  }
}

const api = new Api('https://around.nomoreparties.co/v1/web_es_11', {

  authorization: "962f1eb6-c335-46ac-b3a5-7d22c2a5fd9a", "Content-Type": "application/json"

});

export default api;