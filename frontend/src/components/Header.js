import { Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import { Route, Routes } from 'react-router-dom';

function Header({ onLogout, email }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Лого сайта Места" src={headerLogo} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__nav">
              <p className="header__nav-paragraph">{email}</p>
              <Link to="/sign-in" className="header__link" onClick={onLogout}>
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
