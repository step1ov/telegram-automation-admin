import {Tag} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
import gendersData from "@/components/users/user-gender/genders-data";

const UserGender = ({value} : {value: "male" | "female" | "not_specified" | null | undefined}) => {
    if (!value) value = "not_specified";
    const item = gendersData[value];
    return (
        <Tag><FontAwesomeIcon icon={item.icon} /> {item.text}</Tag>
    )
}

export default UserGender;
