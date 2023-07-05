import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import getVisibleColumns from "@/components/data-table/get-visible-columns";
import {DataTableExportProps} from "@/components/export-modal";
import useSWR from "swr";
import axios, {AxiosError} from "axios";
import {Button, Space, TablePaginationConfig} from "antd";
import {FilterValue, SorterResult, TableRowSelection} from "antd/es/table/interface";
import getSorterData from "@/components/data-table/get-sorter-data";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {ColumnsType, ColumnType} from "antd/lib/table";
import saveVisibleColumns from "@/components/data-table/save-visible-columns";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useDataModal from "@/components/export-modal/hooks/use-data-modal";

const DEFAULT_PAGE_SIZE = 20;

export interface UseDataTableProps {
    columns: ColumnsType<any>,
    url: string,
    sortField?: string,
    sortOrder?: 'asc' | 'desc',
    editButton?: boolean,
    onCreate?: () => void,
    onUpdate?: (record: any) => void,
    debug?: boolean,
    onDetailed?: (record: any) => void,
    remainSelection?: boolean
}

interface UseDataTableDefaultProps {
    sortField: string,
    sortOrder: 'asc' | 'desc',
    editButton: boolean
}

const defaultProps: UseDataTableDefaultProps = {
    sortField: 'createdAt',
    sortOrder: 'desc',
    editButton: true
}

export interface UseDataTableResult {
    search: string,
    setSearch: (value: string) => void,
    handleSearch: (value: string) => void,
    columns: ColumnsType<any>,
    visibleColumns: Record<string, boolean>,
    handleVisibleColumnChange: (e: CheckboxChangeEvent, col: ColumnType<any>) => void,
    handleVisibleColumnCheckAllChange: (e: CheckboxChangeEvent) => void,
    exportBusy: boolean,
    handleShowExportModal: () => void,
    handleHideExportModal: () => void,
    data: PaginationData<any> | AxiosError | undefined,
    error: any,
    handleTableChange: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[]
    ) => void,
    tableParams: PaginationParams,
    displayColumns: ColumnsType<any>,
    exportModalVisible: boolean,
    exportOptions: DataTableExportProps,
    handleExport: () => void,
    handleExportOptionsChange: (data: any) => void,
    records: any[],
    onUpdate?: (record: any) => void,
    mutate: () => void,
    rowSelection?: TableRowSelection<any>,
    selectedRowKeys?: React.Key[],
    setSelectedRowKeys: (keys: React.Key[]) => void
}

const useDataTable = (props: UseDataTableProps) : UseDataTableResult => {

    const { columns, url, sortField, sortOrder, editButton, onUpdate, debug, onDetailed, remainSelection } = { ...defaultProps, ...props }
    const [search, setSearch] = useState('');
    const [searchDebounced] = useDebounce(search, 500);
    const [visibleColumns, setVisibleColumns] = useState(getVisibleColumns(columns, url));
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [tableParams, setTableParams] = useState<PaginationParams>({
        pageIndex: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        sortField,
        sortOrder,
        search: ''
    });

    const  {
        exportBusy,
        handleShowExportModal,
        handleHideExportModal,
        exportModalVisible,
        exportOptions,
        handleExport,
        handleExportOptionsChange,
    } = useDataModal(
        () => axios.get(url, {
            params: {
                skip: 0,
                limit: 0,
                sortField: tableParams.sortField,
                sortOrder: tableParams.sortOrder,
                search: tableParams.search
            }})
            .then(res => {
                const records = res.data.records;
                const len = records.length;
                const filtered = [];
                const cols = exportOptions.columns === 'all' ?
                    columns.filter(x => x.key !== undefined) :
                    columns.filter(x => x.key !== undefined && visibleColumns[x.key]);
                const colsLen = cols.length;
                if (exportOptions.format === 'json') {
                    for (let i = 0; i < len; i++) {
                        const elem = records[i];
                        const item: Record<string, any> = {};
                        for (let j = 0; j < colsLen; j++) {
                            const key = cols[j].key;
                            if (key) {
                                item[key] = getExportDataValue(elem, cols[j]);
                            }
                        }
                        filtered.push(item);
                    }
                } else {
                    const headers = cols.map(x => x.title);
                    filtered.push(headers);
                    for (let i = 0; i < len; i++) {
                        const elem = records[i];
                        const item = [];
                        for (let j = 0; j < colsLen; j++) {
                            item.push(getExportDataValue(elem, cols[j]));
                        }
                        filtered.push(item);
                    }

                }
                return filtered;
            }), url.replace('/', '-')
    )

    const { data, error, mutate } = useSWR<PaginationData<any>| AxiosError>(
        {
            url,
            params: {
                skip: tableParams.pageIndex * tableParams.pageSize,
                limit: tableParams.pageSize,
                sortField: tableParams.sortField,
                sortOrder: tableParams.sortOrder,
                search: tableParams.search,
                filters: JSON.stringify(tableParams.filters)
            }},
        ({ url, params }) => axios.get(url, { params }).then(x => x.data).catch(e => e)
    );

    if (debug) {
        console.log(url, data);
    }

    useEffect(() => {
        handleSearch(searchDebounced)
    }, [searchDebounced]);

    useEffect(() => {
        handleSearch(searchDebounced)
    }, []);

    useEffect(() => {
        if (!remainSelection) setSelectedRowKeys([])
    }, [data]);

    const cleanFiltersData = (filters: Record<string, FilterValue | null>) :
        Record<string, (string | number)[]> | undefined => {
        if (filters) {
            return Object.keys(filters)
                .filter(key => filters[key])
                .reduce((acc, key) => ({ ...acc, [key]: filters[key]}), {});
        }
        return undefined;
    }

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[]
    ) => {
        const sortData = getSorterData(sorter);

        const newParams: Partial<PaginationParams> = {
            pageIndex: pagination.current ? pagination.current - 1 : 0,
            pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
        }

        if (sortData) {
            newParams.sortField = sortData.sortField;
            newParams.sortOrder = sortData.sortOrder;
        }

        setTableParams(prev => ({
            ...prev,
            ...newParams,
            filters: cleanFiltersData(filters)
        }));
    }

    const handleSearch = (search: string) => {
        setTableParams(prev => ({
            ...prev,
            pageIndex: 0,
            search
        }))
    }

    const handleVisibleColumnChange = (e: CheckboxChangeEvent, col: ColumnType<any>) => {
        setVisibleColumns(prev => {
            const items = { ...prev, [col.key as string]: e.target.checked }
            saveVisibleColumns(url, items);
            return items;
        })
    }

    const handleVisibleColumnCheckAllChange = (e: CheckboxChangeEvent) => {
        const items = columns.reduce((acc, v) => ({ ...acc, [v.key as string]: e.target.checked}), {}) as Record<string, boolean>;
        setVisibleColumns(items);
        saveVisibleColumns(url, items);
    }

    const getExportDataValue = (row: any, col: any) => {
        if (col.dataIndex) {
            let value = undefined;
            if (Array.isArray(col.dataIndex)) {
                let parent = row
                for (let i = 0; i < col.dataIndex.length; i++) {
                    if (parent[col.dataIndex[i]]) {
                        parent = col.dataIndex[i]
                    }
                }
                if (parent) {
                    value = parent;
                }
            } else {
                value = row[col.dataIndex];
            }
            if (col.exportFormatter) {
                return col.exportFormatter(value, row);
            }
            return value;
        }
        return undefined;
    }

    let displayColumns = columns.filter(x => visibleColumns[x.key as string]);

    if (tableParams && tableParams.filters && Object.keys(tableParams.filters).length > 0) {
        displayColumns = displayColumns.map(x => {
            if (x.key && tableParams.filters && tableParams.filters[x.key]) {
                return ({ ...x, filteredValue: tableParams.filters[x.key] })
            }
            return x;
        })
    }

    let records = data && 'records' in data ? data.records : [];

    if (editButton || onDetailed) {
        displayColumns.push({
            key: '__actions__',
            render: (_, record: any) =>
                <Space direction="horizontal">
                    {editButton &&
                        <Button icon={<FontAwesomeIcon icon={faPencil}/>}
                                size={'small'}
                                onClick={() => !!onUpdate && onUpdate(record)} />
                    }
                    {!!onDetailed &&
                        <Button size={'small'}
                                onClick={() => onDetailed(record)} >
                            Подробнее
                        </Button>
                    }
                </Space>
                ,
        })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        if (remainSelection){
            const otherPageKeys = records ? selectedRowKeys.filter(x => !records.find(y => y.id === x)) : [];
            setSelectedRowKeys([...otherPageKeys, ...newSelectedRowKeys]);
        } else {
            setSelectedRowKeys(newSelectedRowKeys);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return {
        search,
        setSearch,
        handleSearch,
        columns,
        visibleColumns,
        handleVisibleColumnChange,
        handleVisibleColumnCheckAllChange,
        exportBusy,
        handleShowExportModal,
        handleHideExportModal,
        data,
        error,
        handleTableChange,
        tableParams,
        displayColumns,
        exportModalVisible,
        exportOptions,
        handleExport,
        handleExportOptionsChange,
        records,
        onUpdate,
        mutate,
        rowSelection,
        selectedRowKeys,
        setSelectedRowKeys
    }
}

export default useDataTable;
