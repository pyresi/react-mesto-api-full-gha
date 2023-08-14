class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.makeHeaders = config.makeHeaders;
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
      headers: this.makeHeaders()
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this.makeHeaders()
    });
  }

  changeAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this.makeHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  postCard(name, link) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: this.makeHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  editUserInfo(name, about) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this.makeHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  putLike(cardId) {
    // console.log(cardId);
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.makeHeaders()
    });
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.makeHeaders()
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.makeHeaders()
    });
  }

  registerUser(email, password) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: this.makeHeaders(),
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  loginUser(email, password) {
    return this._request(`/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  verifyUser() {
    return this._request(`/users/me`, {
      method: 'GET',
      headers: this.makeHeaders(),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://pyresi.mesto.back.nomoreparties.co',
  makeHeaders: () => {
    return {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }
});
