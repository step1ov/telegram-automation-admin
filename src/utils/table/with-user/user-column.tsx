import UserLink from "@/components/users/user-link";
import getUserDisplayText from "@/utils/users/get-user-display-text";

const userColumn = {
    title: 'Пользователь',
    dataIndex: 'userId',
    key: 'userId',
    sorter: true,
    render: (cell: any) => <UserLink {...cell} />,
    exportFormatter: (cell: any) => getUserDisplayText(cell)
};

export default userColumn;
