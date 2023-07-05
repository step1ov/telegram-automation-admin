import {useState} from "react";
import {DataTableExportProps} from "@/components/export-modal";
import {notification} from "antd";
import {saveAs} from "file-saver";
import ExcelJS from "exceljs";

export interface UseDataModalResult {
    exportBusy: boolean,
    handleShowExportModal: () => void,
    handleHideExportModal: () => void,
    exportModalVisible: boolean,
    exportOptions: DataTableExportProps,
    handleExport: () => void,
    handleExportOptionsChange: (data: any) => void,
}

export type GetExportDataAsyncType = (exportOptions: DataTableExportProps) => Promise<any[]>;
export type GetExportDataSyncType = (exportOptions: DataTableExportProps) => any[];


const useDataModal = (
    getExportData: GetExportDataAsyncType | GetExportDataSyncType,
    fileName: string,
) : UseDataModalResult => {
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [exportBusy, setExportBusy] = useState(false);
    const [exportOptions, setExportOptions] = useState<DataTableExportProps>({
        columns: 'current',
        format: 'xlsx'
    });

    const handleShowExportModal = () => {
        if (!exportBusy) {
            setExportModalVisible(true);
        }
    }

    const handleHideExportModal = () => {
        setExportModalVisible(false);
    }

    const handleExportDone = () => {
        setExportBusy(false);
        notification.success({
            message: 'Экспорт завершен',
            duration: 1
        });
    }

    const handleExportError = (e: any) => {
        setExportBusy(false);
        notification.error({
            message: 'Ошибка экспорта',
            description: e.toString(),
        });
    }

    const handleExportOptionsChange = (data: any) => {
        setExportOptions(prev => ({ ...prev, ...data }))
    }

    const handleSave = (data: any[]) => {
        if (exportOptions.format === 'json') {
            saveAs(new Blob([JSON.stringify(data, null, '\t'),]), fileName + '.json');
            handleExportDone();
        } else {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Лист 1');
            worksheet.addRows(data);

            if (exportOptions.format === 'xlsx') {
                workbook.xlsx.writeBuffer()
                    .then(buffer => {
                        saveAs(new Blob([buffer]), fileName + '.xlsx');
                        handleExportDone();
                    })
                    .catch(e => handleExportError(e));
            } else {
                workbook.csv.writeBuffer()
                    .then(buffer => {
                        saveAs(new Blob([buffer]), fileName + '.csv');
                        handleExportDone();
                    })
                    .catch(e => handleExportError(e));
            }
        }
    }

    const handleExport = async () => {
        setExportBusy(true);
        setExportModalVisible(false);
        try {
            const res = getExportData(exportOptions);
            if (res instanceof Promise) {
                res.then(x => handleSave(x)).catch(e => handleExportError(e))
            } else {
                handleSave(res);
            }
        } catch (e) {
            handleExportError(e)
        }
    }

    return {
        exportBusy,
        handleShowExportModal,
        handleHideExportModal,
        exportModalVisible,
        exportOptions,
        handleExport,
        handleExportOptionsChange,
    }
}
export default useDataModal;
