import { useMatch, useParams } from "react-router-dom";
import PanelControl from "../components/admin/PanelControl";
import { useEffect, useState } from "react";
import { Auth } from "../../services/Auth.js";

export function Admin() {

    const match = useMatch('/admin/:page/:section?');
    const page = match?.params?.page;
    const [adminInfo, setAdminInfo] = useState({});

    useEffect(() => {

        Auth.checkMe()

    }, [page])
    return (
        <PanelControl adminInfo={adminInfo} />
    )
}