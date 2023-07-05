import React from "react";
import userTableColumns from "@/components/users/users-table/user-table-columns";
import {Form, Input, InputNumber, Select} from "antd";
import EditableTable from "@/components/editable-table";
import genderOptions from "@/components/users/user-gender/gender-options";
import statusOptions from "@/components/users/user-status/status-options";
import useUserRoles from "@/hooks/users/use-user-roles";
import dataToOptions from "@/utils/data-to-options";

const { TextArea } = Input;
const maxYear = (new Date()).getFullYear() - 10;
const minYear = maxYear - 100;

const UsersTable = () => {

    const rolesData = useUserRoles();
    const roles = dataToOptions(rolesData.data, 'id')

    return (
        <EditableTable columns={userTableColumns}
                       url={'users'}
                       title={'пользователь'}
                       updateTitle={'пользователя'}
                       preDataTransform={(data: any) =>
                           ({...data,
                               role: data.role && data.role.id
                           })}
                       initialValues={{
                           status: 'draft',
                           role: 'user'
                       }}
                       debug
        >
            {
                (initialValues: any) =>
                    <>
                        {
                            !initialValues?.id &&
                                <Form.Item name="email" label={'Email'}
                                           rules={[{ required: true, type: 'email', message: 'Пожалуйста, укажите email' }]}>
                                    <Input />
                                </Form.Item>
                        }
                        <Form.Item name="username" label={'Имя пользователя'} >
                            <Input />
                        </Form.Item>
                        <Form.Item name="gender" label={'Пол'} >
                            <Select options={genderOptions} />
                        </Form.Item>
                        <Form.Item name="dob" label={'Год рождения'} >
                            <InputNumber min={minYear} max={maxYear} />
                        </Form.Item>
                        <Form.Item name="status" label={'Статус'} >
                            <Select options={statusOptions}/>
                        </Form.Item>
                        <Form.Item name="role" label={'Роли'} >
                            <Select options={roles} />
                        </Form.Item>
                        <Form.Item name="region" label={'Регион'} >
                            <Input />
                        </Form.Item>
                        <Form.Item name="about" label={'О себе'} >
                            <TextArea rows={4} />
                        </Form.Item>
                    </>
            }
        </EditableTable>
    )
}

export default UsersTable
