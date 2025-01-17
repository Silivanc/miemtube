import { useState } from "react";
import clsx from "clsx";

const sharedInputStyles = "mb-4 border-2 border-gray-400 rounded-lg px-2 py-2";

export function AddUserForm() {
  const [error, setError] = useState("");

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

    if (password !== checkPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    if (!username || !name || !email || !role || !password) {
      setError("Все поля обязательны для заполнения.");
      return;
    }

    setError("");
    const payload = { username, name, email, role, password };

    console.log("Данные формы:", payload);

    // Отправка данных на сервер
    try {
      const result = await /* Ваш запрос на сервер */ null;
      if (result) {
        alert("Пользователь успешно добавлен.");
      } else {
        alert("Ошибка при добавлении пользователя.");
      }
    } catch (error) {
      console.error("Ошибка при добавлении пользователя:", error);
      alert("Ошибка при добавлении пользователя.");
    }
  };

  return (
    <form className="flex flex-col p-8 w-[492px] border border-gray-300 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6">Добавить пользователя</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        name="username"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите username"
        required
      />

      <input
        type="text"
        name="name"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите имя"
        required
      />

      <input
        type="email"
        name="email"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите email"
        required
      />

      <select
        name="role"
        className={clsx(sharedInputStyles, "h-10")}
        required
      >
        <option value="">Выберите роль</option>
        <option value="admin">Администратор</option>
        <option value="editor">Редактор</option>
        <option value="viewer">Просмотр</option>
      </select>

      <input
        type="password"
        name="password"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Введите пароль"
        required
      />

      <input
        type="password"
        name="checkPassword"
        className={clsx(sharedInputStyles, "h-10")}
        placeholder="Повторите пароль"
        required
      />

      <button
        type="submit"
        className="w-full h-12 text-white bg-[#244A9A] rounded-full font-medium"
      >
        Добавить пользователя
      </button>
    </form>
  );
}
