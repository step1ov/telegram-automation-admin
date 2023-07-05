import dayjs from "dayjs";

const timestampsColumns = [
    {
        title: 'Создан',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (record: Date) => dayjs(record).format('DD.MM.YYYY HH:mm:ss'),
        sorter: true,
        hidden: false
    },
    {
        title: 'Изменен',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (record: Date) => dayjs(record).format('DD.MM.YYYY HH:mm:ss'),
        sorter: true,
        hidden: false
    },
];

export default timestampsColumns;
