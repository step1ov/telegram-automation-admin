import {Tag} from "antd";

export type StatusType = 'draft' | 'active' | 'blocked' | 'deleted' | null | undefined;

const statuses = {
    draft: {
        translation: "Черновик",
        color: null
    },
    active : {
        translation: "Активный",
        color: "green"
    },
    blocked: {
        translation: "Заблокирован",
        color: "red"
    },
    deleted: {
        translation: "Удален",
        color: "red"
    }
}

const StatusTag = ({value} : {value: StatusType}) => {
    if (!value) value = "draft";
    const item = statuses[value];
    return (
        <Tag color={(item.color ?? undefined)}>{item.translation}</Tag>
    )
}

export default StatusTag;
