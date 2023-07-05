import {Modal} from "antd";

export interface DeleteConfirmationModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void,
}

const DeleteConfirmationModal = ({ visible, onOk, onCancel } : DeleteConfirmationModalProps) => {
    return (
        <Modal title="Подтверждение удаления"
               open={visible}
               onOk={onOk}
               onCancel={onCancel}
               okText={'Удалить'}
               okButtonProps={ { danger: true } }
               cancelText={'Отмена'}
        >
            <p>
                Это действие приведет к безвозвратному удалению выделенных элементов. Вы уверены, что хотите продолжить?
            </p>
        </Modal>
    )
}

export default DeleteConfirmationModal;
