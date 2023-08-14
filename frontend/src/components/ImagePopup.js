import { AppContext } from '../contexts/CurrentAppContext';
import { useContext } from 'react';

function ImagePopup({ card }) {
  const { closeAllPopups } = useContext(AppContext);
  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div
      className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__button-close"
          type="button"
          onClick={closeAllPopups}
        />
        <img
          className="popup__photo"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <h2 className="popup__photo-subtitle">{card ? card.name : ''}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
