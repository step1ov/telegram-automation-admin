import {Alert, Spin, Table, TablePaginationConfig} from "antd";
import React from "react";
import {AxiosError} from "axios";
import {ColumnsType} from "antd/lib/table";
import {FilterValue, SorterResult, TableCurrentDataSource, TableRowSelection} from "antd/es/table/interface";

interface DataTableComponentProps {
    data: PaginationData<any> | AxiosError | undefined,
    error: any,
    columns: ColumnsType<any>,
    onTableChange: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void,
    tableParams: PaginationParams,
    records: any[],
    rowSelection?: TableRowSelection<any>
}

const DataTableComponent = ({
                                data,
                                records,
                                error,
                                columns,
                                onTableChange,
                                tableParams,
                                rowSelection
                            }: DataTableComponentProps) => {
    if (!data) {
        return (
            <Spin size={'large'}/>
        )
    }

    if (error) {
        return (
            <Alert message={error.toString()} type="error"/>
        )
    }

    if ('message' in data) {
        return (
            <Alert message={data.message} type="error"/>
        )
    }

    return (
        <Table dataSource={records}
               columns={columns}
               rowKey={'id'}
               onChange={onTableChange}
               size={'small'}
               rowSelection={rowSelection}
               pagination={{
                   pageSize: data.pagination.limit,
                   total: data.pagination.total,
                   current: tableParams.pageIndex + 1
               }}/>
    )
}

export default DataTableComponent;
