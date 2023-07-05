import UserGender from "@/components/users/user-gender";
import UserLink from "@/components/users/user-link";
import withTimestamps from "@/utils/table/with-timestamps";
import withId from "@/utils/table/with-id";
import React from "react";
import UserStatus from "@/components/users/user-status";
import gendersData from "@/components/users/user-gender/genders-data";
import statusesData from "@/components/users/user-status/statuses-data";

const userTableColumns = [
    {
        title: 'Пользователь',
        dataIndex: 'displayName',
        key: 'displayName',
        render: (cell: any, record: any) => <UserLink {...record} />,
        sorter: true,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: true,
    },
    {
        title: 'Имя пользователя',
        dataIndex: 'username',
        key: 'username',
        sorter: true,
    },
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: true,
        hidden: true
    },
    {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: true,
        hidden: true
    },
    {
        title: 'Год рождения',
        dataIndex: 'dob',
        key: 'dob',
        sorter: true,
    },
    {
        title: 'Пол',
        dataIndex: 'gender',
        key: 'gender',
        sorter: true,
        render: (cell: any) => <UserGender value={cell} />,
        exportFormatter: (cell: string) => cell === 'male' ? 'Мужчина' : (cell === 'female' ? 'Женщина' : 'Не задан'),
        filters: Object.entries(gendersData)
            .map(([key, value]) => ({ text: value.text, value: key }))
    },
    {
        title: 'Регион',
        dataIndex: 'region',
        key: 'region',
        sorter: true,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
        render: (cell: any) => <UserStatus value={cell} />,
        filters: Object.entries(statusesData)
            .map(([key, value]) => ({ text: value.text, value: key }))
    },
    {
        title: 'Роль',
        dataIndex: ['role', 'id'],
        key: 'role',
        sorter: true,
        hidden: true
    },
];

export default withTimestamps(withId(userTableColumns));
