import { AppContext } from '../contexts/CurrentAppContext';
import { useContext } from 'react';

function PopupWithForm({
  isOpen,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  const { closeAllPopups } = useContext(AppContext);

  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={closeAllPopups}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={`popup-form-${name}`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
