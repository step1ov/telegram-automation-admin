import React from "react";
import {Form, Input} from "antd";
import EditableTable from "@/components/editable-table";
import settingsTableColumns from "@/components/collections/settings/settings-table/settings-table-columns";

const SettingsTable = () => {
    return (
        <EditableTable columns={settingsTableColumns}
                       url={'settings'}
                       title={'запись'}
                       sortField={'title'}
                       sortOrder={'asc'} >
            <Form.Item label="Ярлык"
                       name="slug"
                       rules={[{ required: true, message: 'Пожалуйста введите ярлык' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Заголовок"
                       name="title"
                       rules={[{ required: true, message: 'Пожалуйста введите заголовок' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Значение / данные"
                       name="data">
                <Input />
            </Form.Item>
        </EditableTable>
    )
}

export default SettingsTable
