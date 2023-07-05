import React from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faWandSparkles} from "@fortawesome/free-solid-svg-icons";

const userMenuItems = (rootPath: string): ItemType[] => [
    {
        key: `${rootPath}/telegram`,
        icon: <FontAwesomeIcon icon={faTelegram as IconProp}/>,
        label: 'Telegram',
    },
    {
        key: `${rootPath}/automation`,
        icon: <FontAwesomeIcon icon={faWandSparkles}/>,
        label: 'Сценарии',
    }
]

export default userMenuItems;
