import React from "react";
import {Form, Input, Switch} from "antd";
import EditableTable from "@/components/editable-table";
import automationTableColumns from "@/components/automation/automation-table/automation-table-columns";

const { TextArea } = Input;

const AutomationTable = ({userId} : {userId: string}) => {
    return (
        <EditableTable columns={automationTableColumns}
                       url={{
                           load: 'automation?filters=' + JSON.stringify({ userId: [userId] }),
                           edit: 'automation'
                       }}
                       title={'сценарий'}
                       sortField={'title'}
                       sortOrder={'asc'}
                       postDataTransform={(data: any) => ({ ...data, userId }) }
        >
            <Form.Item label="Заголовок"
                       name="title"
                       rules={[{ required: true, message: 'Пожалуйста введите заголовок' }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Название чата" name="chatName">
                <Input />
            </Form.Item>
            <Form.Item label="ID чата" name="chatId">
                <Input />
            </Form.Item>
            <Form.Item label="Активно" name="isEnabled" valuePropName="checked">
                <Switch />
            </Form.Item>
        </EditableTable>
    )
}

export default AutomationTable
