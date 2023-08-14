class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endPoint, options) {
    return fetch(`${this.baseUrl}${endPoint}`, options).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this.headers,
    }.data);
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this.headers,
    }.data);
  }

  changeAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).data;
  }

  postCard(name, link) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).data;
  }

  editUserInfo(name, about) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).data;
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId).data;
    } else {
      return this.deleteLike(cardId).data;
    }
  }

  putLike(cardId) {
    // console.log(cardId);
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    }).data;
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).data;
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).data;
  }

  registerUser(email, password) {
    return fetch(`https://pyresi.mesto.back.nomoreparties.co/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  loginUser(email, password) {
    return fetch(`https://pyresi.mesto.back.nomoreparties.co/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  verifyUser() {
    return fetch(`https://pyresi.mesto.back.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://pyresi.mesto.back.nomoreparties.co',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});
