import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { Auth } from "../../../../services/Auth";
import { useSearchParams } from "react-router-dom";

const sharedInputStyles = "mb-4 border-2 border-gray-400 rounded-lg px-2 py-2";

export function AddUser({ setActiveIndex }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef();

  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      Auth.getUser(userId)
        .then(setUser)
        .catch((err) => setError("Не удалось загрузить данные пользователя."));
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const username = formData.get("username");
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const password = formData.get("password");
    const checkPassword = formData.get("checkPassword");

    if (!user) {
      if (password !== checkPassword) {
        setError("Пароли не совпадают.");
        return;
      }
    }

    if (!username || !name || !email || (!user && (!password || !role))) {
      setError("Все поля обязательны для заполнения.");
      return;
    }

    setError("");
    const payload = Object.fromEntries(
      Object.entries({ username, name, email, role, password })
        .filter(([_, value]) => value !== undefined && value !== null) // Оставляем только существующие значения
    );

    try {
      if (!userId) {
        await Auth.addUser(payload);
      } else {
        payload.user_id = userId;
        user && await Auth.changeUser(payload);
      }
      formRef.current.reset();
      setActiveIndex(0);
    } catch (err) {
      alert(err?.response?.data?.detail)
    }
  };

  const prefillForm = user
    ? {
        username: user.username,
        name: user.name,
        email: user.email,
      }
    : {};

  return (
    <form
      ref={formRef}
      autoComplete="off"
      className="flex flex-col p-8 w-[492px]"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <label>Username</label>
      <input
        type="text"
        name="username"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите username"
        defaultValue={prefillForm.username}
        required
      />

      <label>Имя</label>
      <input
        type="text"
        name="name"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите имя"
        defaultValue={prefillForm.name}
        required
      />

      <label>Электронная почта</label>
      <input
        type="email"
        name="email"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите email"
        defaultValue={prefillForm.email}
        required
      />

      {!user && (
        <>
          <label>Роль</label>
          <select
            name="role"
            className={clsx(sharedInputStyles, "h-10")}
            defaultValue={prefillForm.role}
            required
          >
            <option value="" disabled>
              Выберите роль
            </option>
            <option value="ADMIN">Администратор</option>
            <option value="REDACTOR">Редактор</option>
          </select>

          <label>Пароль</label>
          <input
            type="password"
            name="password"
            className={clsx(sharedInputStyles, "h-10")}
            placeholder="Введите пароль"
            required
          />

          <label>Повторите пароль</label>
          <input
            type="password"
            name="checkPassword"
            className={clsx(sharedInputStyles, "h-10")}
            placeholder="Повторите пароль"
            required
          />
        </>
      )}

      <button
        type="submit"
        className="w-full h-12 text-white bg-[#244A9A] rounded-full font-medium"
      >
        {user ? "Сохранить изменения" : "Добавить пользователя"}
      </button>

      {user && (
        <button
          type="button"
          className="w-full h-12 text-white bg-gray-500 rounded-full font-medium mt-4"
          onClick={() => {
            formRef.current.reset();
            setActiveIndex(0);
            setSearchParams({});
          }}
        >
          Отмена
        </button>
      )}
    </form>
  );
}
