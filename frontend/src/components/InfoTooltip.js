import { AppContext } from '../contexts/CurrentAppContext';
import { useContext } from 'react';
import TickIcon from '../images/tick.svg';
import CrossIcon from '../images/cross.svg';

function AuthorizationPopup({ isSuccess, isOpen }) {
  const { closeAllPopups } = useContext(AppContext);
  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div
      className={`popup popup_type_auth ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={closeAllPopups}
        />
        <img
          className="popup__auth-icon"
          src={isSuccess ? TickIcon : CrossIcon}
          alt={'icon'}
        />
        <h2 className="popup__auth-message">
          {isSuccess
            ? 'Вы успешно зарегестрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </div>
  );
}

export default AuthorizationPopup;
