import clsx from "clsx";
import { CloseIcon } from "../panelControl/icons/personalIcon";
import { useState } from "react";

export function Popup(props) {
    const [visibility, setVisibility] = useState(true);

    const closePopup = () => {
        setTrigger(!trigger);
        props.visibility = 'hidden';
    }

    return (
        <div className={clsx(props.visibility, "fixed w-full h-full bg-gray-600 bg-opacity-50 top-0 left-0 flex justify-center items-center")}>
            <div className="w-1/3 h-1/3 my-3 bg-white relative">
                <div className="cursor-pointer absolute right-1 top-1"
                onClick={() => closePopup}>
                    {<CloseIcon />}
                </div>
            </div>
        </div>
    )
}