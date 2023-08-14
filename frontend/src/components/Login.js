import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onLogin(email, password);
  }

  return (
    <div className="authorization">
      <h2 className="authorization__header">Вход</h2>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input
          type="text"
          required=""
          name="register-email"
          className="authorization__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          required=""
          name="register-password"
          className="authorization__input"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="authorization__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
