import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <div className="tabs">
                <div className="tabs-logo">
                    <img src="../../static/images/logo.png" alt="ВШЭ"/>
                </div>
                <div className="tabs-points">
                    <Link
                        to={{
                            pathname: `playlists`
                        }}
                    >Курсы</Link>
                    <div className="tabs-point">Трансляции</div>
                </div>
            </div>
            <div className="sign">
                Войти
            </div>
        </nav>
    )
}