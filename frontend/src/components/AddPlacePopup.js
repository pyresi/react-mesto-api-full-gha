import PopupWithForm from './PopupWithForm';
import { useState, useContext } from 'react';
import React from 'react';
import { AppContext } from '../contexts/CurrentAppContext';

function AddPlacePopup({ isOpen, onSubmit }) {
  const { isLoading } = useContext(AppContext);
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(name, link);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="input-title"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__form-field-error" />
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          name="input-link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required=""
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__form-field-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
