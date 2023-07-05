import UserSearch from "@/components/users/user-search";
import {Form} from "antd";
import React from "react";

const UserSearchField = ({initialValues}: {initialValues: any}) =>
    <Form.Item label="Пользователь"
               name="userId"
               rules={[{ required: true, message: 'Пожалуйста укажите пользователя' }]}>
        <UserSearch disabled={!!initialValues && initialValues.id}/>
    </Form.Item>

export default UserSearchField;
