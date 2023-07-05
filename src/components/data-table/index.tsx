import React, {ReactNode} from "react";
import {
    Button,
    Col,
    Dropdown,
    Input,
    Row,
    Tag,
} from "antd";
import ColumnsSelect from "@/components/data-table/columns-select";
import DataTableComponent from "@/components/data-table/data-table-component";
import ExportModal from "@/components/export-modal";
import {UseDataTableResult} from "@/components/data-table/hooks/use-data-table";
import ExportModalButton from "@/components/export-modal/export-modal-button";

const {Search} = Input;

export interface DataTableProps extends UseDataTableResult {
    accessoryLeft?: ReactNode,
    accessoryRight?: ReactNode,
}

const DataTable = ({
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
                       accessoryLeft,
                       accessoryRight,
                       rowSelection
                   }: DataTableProps) => {


    return (
        <>
            <Row justify={'space-between'} style={{marginBottom: '8px'}}>
                <Col>
                    {accessoryLeft}
                    {' '}
                    <Search
                        placeholder="Введите текст для поиска"
                        allowClear
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={handleSearch}
                        style={{width: 360}}
                    />
                    {' '}
                    <Dropdown dropdownRender={() =>
                        <ColumnsSelect columns={columns}
                                       values={visibleColumns}
                                       onChange={handleVisibleColumnChange}
                                       onCheckAllChange={handleVisibleColumnCheckAllChange}/>
                    } trigger={['click']}>
                        <Button>Колонки</Button>
                    </Dropdown>
                    {' '}
                    <ExportModalButton exportBusy={exportBusy} handleShowExportModal={handleShowExportModal} />
                    {' '}
                    {accessoryRight}
                </Col>
                <Col>
                    {!!data && 'pagination' in data && <Tag>{`Записи: ${data.pagination?.total}`}</Tag>}
                </Col>
            </Row>
            <DataTableComponent data={data} records={records}
                                onTableChange={handleTableChange}
                                tableParams={tableParams}
                                columns={displayColumns}
                                rowSelection={rowSelection}
                                error={error}/>
            <ExportModal visible={exportModalVisible}
                         options={exportOptions}
                         onExport={handleExport}
                         onCancel={handleHideExportModal}
                         onChange={handleExportOptionsChange}/>
        </>

    )
}



export default DataTable
