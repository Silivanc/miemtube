import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../config/routes";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Auth } from "../../../services/Auth";
import React from "react";

export function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const exit = () => {
    localStorage.clear();
    setIsAuth(false); 
  };
  

  useEffect(() => {
    Auth.checkMe()
      .then(result => setIsAuth(!!result))
      .catch((error) => console.log(error));
  }, [isAuth]);

  console.log("Пользователь авторизован: " + isAuth);

  return (
    <nav className="sticky top-0 py-[21px] px-[38px] text-white text-base leading-tight flex items-center justify-between bg-[#234A9A] shadow-md z-50 w-full">
      <div className="flex items-center cursor-pointer">
        <div 
        className="mr-9"
        onClick={() => {navigate('/')}}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9994 0C7.17734 0 0 7.17621 0 15.9983C0 24.8215 7.17734 32 15.9994 32C24.8215 32 31.9989 24.8215 31.9989 15.9983C31.9989 7.17621 24.8215 0 15.9994 0ZM15.9994 31.0721C7.68871 31.0721 0.927929 24.3102 0.927929 15.9972C0.927929 7.68759 7.68871 0.9268 15.9994 0.9268C24.3102 0.9268 31.0709 7.68759 31.0709 15.9972C31.0721 24.3102 24.3102 31.0721 15.9994 31.0721ZM18.6557 14.5985C19.666 14.1853 20.2801 13.5487 20.682 13.0655C21.4507 12.1816 21.7657 11.0968 21.7657 10.0718C21.7657 9.24317 21.5377 7.58937 20.0837 6.45035C19.0869 5.6782 18.2019 5.30793 16.0909 5.30793H15.023C14.9902 5.30681 14.9575 5.3068 14.918 5.3068H10.5109V26.1107H23.0898V22.1179C23.0898 18.2967 21.8549 15.7285 18.6557 14.5985ZM20.2395 24.9649H17.9716V18.0212H15.3515V24.9728H13.3477V6.34423H15.4068C16.1778 6.34423 17.3473 6.51695 18.1748 7.54422C18.606 8.0635 18.8701 8.75437 18.9627 9.44975H15.3526V10.4748H18.9954C18.9661 11.1363 18.8318 11.8768 18.1827 12.6636C17.6126 13.3771 16.6745 14.0397 15.3515 14.0397H15.33V15.0772C18.8656 15.0772 20.2417 17.4275 20.2417 21.7296V24.9649H20.2395Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex">
          <Link
            className="mr-4"
            to={{
              pathname: `playlists`,
            }}
          >
            Курсы
          </Link>
          <Link
            to={{
              pathname: `streams`,
            }}
          >
            Трансляции
          </Link>
        </div>
      </div>
      <div className="sign relative inline-block text-left">
        {!isAuth ? (
          <Link
            to={{
              pathname: `login`,
            }}
          >
            Войти
          </Link>
        ) : (
          <div className="relative group">
            <button
              type="button"
              className="inline-flex justify-center items-center w-full px-4 py-2 font-medium text-white bg-transparent focus:outline-none"
            >
              Личный кабинет
              {/* Dropdown arrow */}
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute left-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
              <div className="py-1">
                <Link
                  to={routes.admin}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Личный кабинет
                </Link>
                <Link
                  to={routes.adminVideo}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Мои видео
                </Link>
                <Link
                  to={routes.adminStream}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Мои трансляции
                </Link>
                <Link
                  to={routes.adminPlaylist}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Мои курсы
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={exit}
                >
                  Выйти
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
