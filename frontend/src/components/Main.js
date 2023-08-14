import { useContext } from 'react';
import Card from './Card.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const { currentUser } = useContext(UserContext);

  return (
    <main className="content">
      {/* ---------------- */}
      {/* -----profile----- */}
      {/* ---------------- */}
      <section className="profile">
        <button
          className="profile__avatar"
          type="button"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <h2 className="profile__bio">{currentUser.about}</h2>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      {/* ---------------- */}
      {/* -----elements----- */}
      {/* ---------------- */}
      <div className="elements">
        {cards.map((card, i) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
