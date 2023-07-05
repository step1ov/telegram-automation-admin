import {Form, Modal, Radio} from "antd";
import React from "react";

export interface DataTableExportProps {
    columns: 'current' | 'all',
    format: 'xlsx' | 'csv' | 'json'
}

export interface ExportModalProps {
    visible: boolean;
    onExport: () => void;
    onCancel: () => void,
    options: DataTableExportProps;
    onChange: (data: Partial<DataTableExportProps>) => void,
    showColumnsTypeSelect?: boolean
}

const ExportModal = ({visible, onExport, onCancel, options, onChange, showColumnsTypeSelect}: ExportModalProps) => {
    return (
        <Modal title="Экспорт"
               open={visible}
               onOk={onExport}
               onCancel={onCancel}
               okText={'Экспорт'}
               cancelText={'Отмена'}
        >
            <p>Выберите параметры экспорта. По завершению экспорта будет выведено уведомление.</p>
            <Form layout="vertical" onValuesChange={onChange} initialValues={options}>
                {
                    showColumnsTypeSelect &&
                    <Form.Item label="Колонки" name="columns">
                        <Radio.Group>
                            <Radio.Button value="current">Выбранные</Radio.Button>
                            <Radio.Button value="all">Все</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                }
                <Form.Item label="Формат" name="format">
                    <Radio.Group>
                        <Radio.Button value="xlsx">XLSX</Radio.Button>
                        <Radio.Button value="csv">CSV</Radio.Button>
                        <Radio.Button value="json">JSON</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

ExportModal.defaultProps = {
    showColumnsTypeSelect: true
}

export default ExportModal;
