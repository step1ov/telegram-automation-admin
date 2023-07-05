import withTimestamps from "@/utils/table/with-timestamps";
import withId from "@/utils/table/with-id";

const settingsTableColumns = [
    {
        title: 'Ярлык',
        dataIndex: 'slug',
        key: 'slug',
        sorter: true,
    },
    {
        title: 'Наименование',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
    },
    {
        title: 'Значение / данные',
        dataIndex: 'data',
        key: 'data',
        sorter: true,
    },
];

export default withTimestamps(withId(settingsTableColumns));
