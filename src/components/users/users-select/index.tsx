import React, {useState} from "react";
import {Button, Modal} from "antd";
import DataTable from "@/components/data-table";
import useDataTable from "@/components/data-table/hooks/use-data-table";
import userTableColumns from "@/components/users/users-table/user-table-columns";

export interface UsersSelectProps {
    value?: string[],
    onChange?: (user: string[] | undefined) => void,
}

const UsersSelect = ({value, onChange}: UsersSelectProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dataTableProps = useDataTable({
        columns: userTableColumns,
        url: 'users',
        remainSelection: true
    });

    const showModal = () => {
        value && dataTableProps.setSelectedRowKeys(value);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        onChange && onChange(dataTableProps.selectedRowKeys ? dataTableProps.selectedRowKeys as string[] : [])
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        dataTableProps.setSelectedRowKeys([]);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {value ? `Выбрано пользователей: ${value.length}` : 'Выбрать пользователей'}
            </Button>
            <Modal title="Выбор пользователей"
                   style={{ top: '10px' }}
                   width={'100%'}
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                <DataTable {...dataTableProps}/>
            </Modal>
        </>
    )
}

export default UsersSelect;
