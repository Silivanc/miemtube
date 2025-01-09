import { useMatch, useParams } from "react-router-dom";
import PanelControl from "../components/admin/PanelControl";
import { useEffect, useState } from "react";
import { Auth } from "../../services/Auth.js";

export function Admin() {

    const match = useMatch('/admin/:page/:section?');
    const page = match?.params?.page;
    const [adminInfo, setAdminInfo] = useState({});

    const definePage = (page) => {
        let newAdminInfo = {...adminInfo};
        if (page === 'personal') {
            newAdminInfo.title = 'Личный кабинет';
        } else {
            newAdminInfo.title = 'Панель управления контентом';
        }

        setAdminInfo(newAdminInfo);
        return adminInfo
    }

    useEffect(() => {
        let newAdminInfo = {...adminInfo};
        if (page === 'personal') {
            newAdminInfo.title = 'Личный кабинет';
        } else {
            newAdminInfo.title = 'Панель управления контентом';
        }

        Auth.checkMe()

        setAdminInfo(newAdminInfo);
    }, [])
    return (
        <PanelControl adminInfo={adminInfo}>

        </PanelControl>
    )
}