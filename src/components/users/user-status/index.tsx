import {Tag} from "antd";
import React from "react";
import statusesData from "@/components/users/user-status/statuses-data";

const UserStatus = ({value} : {value: 'draft' | 'active' | 'blocked' | 'deleted' | null | undefined}) => {
    if (!value) value = "draft";
    const item = statusesData[value];
    return (
        <Tag color={item.color}>{item.text}</Tag>
    )
}

export default UserStatus;
