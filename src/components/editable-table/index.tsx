import useDrawerForm from "@/components/drawer-form/hooks/use-drawer-form";
import useDataTable from "@/components/data-table/hooks/use-data-table";
import DataTable from "@/components/data-table";
import DrawerForm from "@/components/drawer-form";
import React, {useState} from "react";
import {ColumnsType} from "antd/lib/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button, Dropdown, FormInstance, MenuProps, notification} from "antd";
import {MinusCircleOutlined} from "@ant-design/icons";
import DeleteConfirmationModal from "@/components/editable-table/delete-confirmation-modal";
import axios from "axios";

export interface EditableTableUrlOptions {
    load: string,
    edit: string
}

export interface EditableTableProps {
    columns: ColumnsType<any>,
    children: any,
    url: string | EditableTableUrlOptions,
    title: string,
    sortField: string,
    sortOrder: 'asc' | 'desc',
    updateTitle?: string,
    postDataTransform?: (data: any) => any,
    preDataTransform?: (data: any) => any,
    initialValues?: any,
    onValuesChange?: ((changedValues: any, values: any) => void) | undefined,
    form?: FormInstance,
    debug?: boolean,
    onDetailed?: (record: any) => void,
    canAdd: boolean
}

const EditableTable = ({
                           columns,
                           children,
                           url,
                           title,
                           updateTitle,
                           sortField,
                           sortOrder,
                           postDataTransform,
                           preDataTransform,
                           initialValues,
                           onValuesChange,
                           form,
                           debug,
                           onDetailed,
                           canAdd
                       }:
                           EditableTableProps) => {

    let loadUrl, editUrl = '';
    if (typeof url === 'string') {
        loadUrl = editUrl = url;
    } else {
        loadUrl = url.load;
        editUrl = url.edit;
    }

    const drawerFormProps = useDrawerForm({
        title,
        updateTitle,
        url: editUrl,
        postDataTransform,
        preDataTransform,
        initialValues,
        onSaved: () => {
            dataTableProps.mutate()
        },
        form
    });

    const dataTableProps = useDataTable({
        columns,
        url: loadUrl,
        sortField,
        sortOrder,
        onUpdate: drawerFormProps.handleUpdate,
        debug,
        onDetailed
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBusy, setDeleteBusy] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            disabled: !(dataTableProps.rowSelection?.selectedRowKeys && dataTableProps.rowSelection?.selectedRowKeys.length > 0),
            label: 'Удалить выделенные',
            icon: <MinusCircleOutlined/>,
            onClick: handleDelete,
            danger: true
        },
    ]

    const handleDeleteConfirm = () => {
        if (!deleteBusy) {
            setDeleteBusy(true);
            axios.post(
                editUrl + '/remove', {ids: dataTableProps.rowSelection?.selectedRowKeys}
            ).then(response => {
                setShowDeleteModal(false)
                notification.success({
                    message: 'Записи удалены',
                    duration: 1
                });
                dataTableProps.mutate();
                setDeleteBusy(false);
            }).catch((error) => {
                console.error(error);
                notification.error({
                    message: 'Ошибка удаления',
                    description: error.toString()
                });
                setDeleteBusy(false);
            });
        }
    }

    return (
        <>
            <DataTable {...dataTableProps}
                       accessoryLeft={canAdd && <Button type="primary"
                                              onClick={drawerFormProps.handleCreate}
                                              icon={<FontAwesomeIcon icon={faPlus}/>}
                                              title={'Создать'}/>}
                       accessoryRight={<Dropdown menu={{items}} trigger={['click']}>
                           <Button icon={<FontAwesomeIcon icon={faEllipsisV}/>}
                                   title={'Дополнительно'}/>
                       </Dropdown>}
            />
            <DrawerForm {...drawerFormProps} onValuesChange={onValuesChange}>
                {children}
            </DrawerForm>
            <DeleteConfirmationModal visible={showDeleteModal}
                                     onOk={handleDeleteConfirm}
                                     onCancel={() => setShowDeleteModal(false)}/>
        </>
    )
}

EditableTable.defaultProps = {
    sortField: 'createdAt',
    sortOrder: 'desc',
    canAdd: true
}

export default EditableTable;
