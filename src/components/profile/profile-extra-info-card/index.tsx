import {Card, Descriptions} from "antd";
import useUserContext from "@/context/user/use-user-context";
import StatusTag from "@/components/status-tag";
import dayjs from "dayjs";

const ProfileExtraInfoCard = () => {
    const userContext = useUserContext();
    const { user } = userContext.data;
    return (
        <Card title={'Дополнительно'} style={{marginBottom: 24}}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label={'Id'}>
                    {user?.id}
                </Descriptions.Item>
                <Descriptions.Item label={'Статус'}>
                    <StatusTag value={user?.status} />
                </Descriptions.Item>
                <Descriptions.Item label={'Роль'}>
                    {user?.role?.id}
                </Descriptions.Item>
                <Descriptions.Item label={'Дата создания'}>
                    {dayjs(user?.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label={'Дата изменения'}>
                    {dayjs(user?.updatedAt).format('DD.MM.YYYY HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default ProfileExtraInfoCard;
