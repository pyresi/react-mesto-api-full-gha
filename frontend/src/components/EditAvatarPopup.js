import PopupWithForm from './PopupWithForm';
import { useContext } from 'react';
import React from 'react';
import { AppContext } from '../contexts/CurrentAppContext';

function EditAvatarPopup({ isOpen, onSubmit }) {
  const inputRef = React.useRef(null); // записываем объект, возвращаемый хуком, в переменную
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label className="popup__form-field">
        <input
          type="url"
          name="input-avatar"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required=""
          ref={inputRef}
        />
        <span className="popup__form-field-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
