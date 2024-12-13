import {useLocation} from "react-router-dom";
import {useState} from "react";

export default function ContentLayout() {
    const location = useLocation();
    const [pageData, setPageData] = useState(() => definePageData());

    function definePageData() {
        let data = {};
        if (location.pathname === '/playlists') {
            data.name = "Курсы";
        }
    }

    return (
        <div>
            {location}
        </div>
    )
}