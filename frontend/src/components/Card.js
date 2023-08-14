import { useContext } from 'react';
import { UserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardClick, onCardDelete }) {
  const { currentUser } = useContext(UserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {card.owner._id === currentUser._id ? (
        <button
          className="element__trash"
          type="button"
          onClick={handleDeleteClick}
        />
      ) : null}
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like && ${isLiked && 'element__like_active'}`}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
