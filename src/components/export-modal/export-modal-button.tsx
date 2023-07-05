import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {Button} from "antd";
import React from "react";

export interface ExportModalButtonProps {
    exportBusy?: boolean,
    handleShowExportModal: () => void
}

const ExportModalButton = ({exportBusy, handleShowExportModal} : ExportModalButtonProps) => {
    return (
        <Button loading={exportBusy}
                icon={!exportBusy && <FontAwesomeIcon icon={faDownload}/>}
                title={'Экспорт'}
                onClick={handleShowExportModal}/>
    )
}

export default ExportModalButton;
