import withTimestamps from "@/utils/table/with-timestamps";
import withId from "@/utils/table/with-id";
import {CheckOutlined} from "@ant-design/icons";

const automationTableColumns = [
    {
        title: 'Наименование',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
    },

    {
        title: 'Чат',
        dataIndex: 'chatName',
        key: 'chatName',
        sorter: true,
        render: (cell?: string, row?: any) => !!cell && !!row?.chatId && `${cell} (${row?.chatId})`
    },
    {
        title: 'Активно',
        dataIndex: 'isEnabled',
        key: 'isEnabled',
        sorter: true,
        render: (cell?: boolean) => cell && <CheckOutlined />
    },
];

export default withTimestamps(withId(automationTableColumns));
