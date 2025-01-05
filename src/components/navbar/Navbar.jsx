import {Link} from "react-router-dom";
import { routes } from "../../../config/routes";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Auth } from "../../../services/Auth";

export function Navbar() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        Auth.checkMe().then(setIsAuth).catch(
            error => console.log(error)
        )
    })

    const exit = (e) => {
        e.preventDefault();
        localStorage.clear();
        setIsAuth(false);
    }

    return (
        <nav className="sticky top-0 py-[21px] px-[38px] text-white text-base leading-tight flex items-center justify-between bg-[#112D69] shadow-md z-50 w-full">
            <div className="flex items-center">
                <div className="mr-9">
                    <img src="static/images/logo.png" alt="ВШЭ"/>
                </div>
                <div className="flex">
                    <Link
                        className="mr-4"
                        to={{
                            pathname: `playlists`
                        }}
                    >Курсы</Link>
                    <Link
                        to={{
                            pathname: `streams`
                        }}
                    >Трансляции</Link>
                </div>
            </div>
            <div className="sign relative inline-block text-left">
                {!isAuth ? <Link
                    to={{
                        pathname: `login`
                    }}
                >Войти</Link> :
                <div className="relative group">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-transparent focus:outline-none"
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
                        <div
                            className="absolute left-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"
                        >
                            <div className="py-1">
                            <Link
                                to={routes.personal}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Личный кабинет
                            </Link>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Видео
                            </Link>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Трансляции
                            </Link>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Курсы
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
                    </div>}
            </div>
        </nav>
    )
}